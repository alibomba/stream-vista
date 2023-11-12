import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';

const contactRoutes: Router = Router();
const prisma = new PrismaClient();

contactRoutes.post('/contact', async (req: Request, res: Response) => {
    const { fullName, email, phoneNumber, subject, content } = req.body;
    if (!fullName) return res.status(422).json({ message: 'Imię i nazwisko są wymagane' });
    if (fullName.length > 150) return res.status(422).json({ message: 'Imię i nazwisko mogą mieć maksymalnie 150 znaków' });
    if (!email) return res.status(422).json({ message: 'Adres e-mail jest wymagany' });
    if (email.length > 70) return res.status(422).json({ message: 'Adres e-mail może mieć maksymalnie 70 znaków' });
    const emailRegex = new RegExp(/^[\w\.-]+@[\w\.-]+\.\w+$/);
    if (!emailRegex.test(email)) return res.status(422).json({ message: 'Podaj poprawny adres e-mail' });
    if (!phoneNumber) return res.status(422).json({ message: 'Numer telefonu jest wymagany' });
    if (phoneNumber.length > 30) return res.status(422).json({ message: 'Numer telefonu może mieć maksymalnie 30 znaków' });
    if (!subject) return res.status(422).json({ message: 'Temat jest wymagany' });
    if (subject.length > 255) return res.status(422).json({ message: 'Temat może mieć maksymalnie 255 znaków' });
    if (!content) return res.status(422).json({ message: 'Treść jest wymagana' });
    if (content.length > 700) return res.status(422).json({ message: 'Treść może mieć maksymalnie 700 znaków' });

    try {
        await prisma.contactMessage.create({
            data: {
                fullName,
                email,
                phoneNumber,
                subject,
                content
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default contactRoutes;