import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, { apiVersion: '2023-10-16' });

async function isSubscriptionActive(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.sendStatus(404);
    if (!user.stripeCustomerId) return res.status(403).json({ message: 'Subskrybcja nie opłacona' });

    const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'active'
    });
    if (subscriptions.data.length === 0) return res.status(403).json({ message: 'Subskrybcja nieaktywna' });
    next();
}

export default isSubscriptionActive;