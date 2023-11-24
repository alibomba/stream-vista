import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import isSubscriptionActive from '../middleware/isSubscriptionActive';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const settingsRoutes: Router = Router();

settingsRoutes.get('/account-settings', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { user: { id } } = req.body;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ message: 'Użytkownik nie istnieje' });

    res.json({ joinedAt: user.joinedAt, email: user.email, oAuth: user.oAuth });
});

settingsRoutes.put('/update-email', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { user: { id }, email } = req.body;
    if (!email) return res.status(422).json({ message: 'Adres e-mail jest wymagany' });
    if (email.length > 70) return res.status(422).json({ message: 'Adres e-mail może mieć maksymalnie 70 znaków' });
    if (await prisma.user.findUnique({ where: { NOT: { id }, email } })) return res.status(422).json({ message: 'Adres e-mail jest już zajęty' });
    const user = await prisma.user.findUnique({ where: { id } });
    if (user?.oAuth) return res.status(422).json({ message: 'Użytkownik ma konto założone przez Google' });

    try {
        await prisma.user.update({ where: { id }, data: { email } });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

settingsRoutes.put('/update-password', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { user: { id }, password, passwordConfirmation } = req.body;
    if (!password) return res.status(422).json({ message: 'Hasło jest wymagane' });
    if (password.length < 8 || password.length > 60) return res.status(422).json({ message: 'Hasło musi mieć pomiędzy 8 a 60 znaków' });
    if (password !== passwordConfirmation) return res.status(422).json({ message: 'Hasła nie są takie same' });
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        await prisma.user.update({
            where: { id },
            data: {
                password: passwordHash
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default settingsRoutes;