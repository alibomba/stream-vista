import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const newsletterRoutes: Router = Router();
const prisma = new PrismaClient();

newsletterRoutes.post('/newsletter', async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) return res.status(422).json({ message: 'Adres e-mail jest wymagany' });
    if (email.length > 70) return res.status(422).json({ message: 'Adres e-mail może mieć maksymalnie 70 znaków' });
    const emailRegex = new RegExp(/^[\w\.-]+@[\w\.-]+\.\w+$/);
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
    const memberFound = await prisma.newsletterMember.findUnique({ where: { email } });
    if (memberFound) return res.status(422).json({ message: 'Podany adres e-mail jest już w bazie' });
    try {
        await prisma.newsletterMember.create({
            data: {
                email
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default newsletterRoutes;