import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import Stripe from 'stripe';
import isSubscriptionActive from '../middleware/isSubscriptionActive';

const subscriptionRoutes: Router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, { apiVersion: '2023-10-16' });

subscriptionRoutes.post('/subscribe', jwtAuthentication, async (req: Request, res: Response) => {
    const { user, priceId } = req.body;
    if (!priceId) return res.status(422).json({ message: 'Wybranie planu jest wymagane' });
    const userFound = await prisma.user.findUnique({ where: { id: user.id } });
    if (!userFound) return res.sendStatus(404);
    var customer;
    if (userFound.stripeCustomerId) {
        customer = { id: userFound.stripeCustomerId };
    }
    else {
        customer = await stripe.customers.create({
            email: userFound.email
        });
    }

    const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        billing_address_collection: 'auto',
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        mode: 'subscription',
        success_url: `${process.env.FRONTEND_URL}/preferencje`,
        cancel_url: `${process.env.FRONTEND_URL}/plany`
    });

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                stripeCustomerId: customer.id
            }
        });
    } catch (err) {
        return res.sendStatus(500);
    }

    res.json({ url: session.url });

});

subscriptionRoutes.post('/create-portal-session', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const userId = req.body.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: user!.stripeCustomerId as string,
        return_url: `${process.env.FRONTEND_URL}/profil`
    });

    res.json({ url: portalSession.url });
});

export default subscriptionRoutes;