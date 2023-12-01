import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import adminAuthentication from '../../middleware/adminAuthentication';

const authRoutes: Router = Router();
const prisma = new PrismaClient();

authRoutes.post('/login', async (req: Request, res: Response) => {
    const { login, password } = req.body;
    if (!login || !password) return res.status(401).json({ message: 'Niepoprawny login lub hasło' });
    const adminFound = await prisma.admin.findUnique({ where: { login } });
    if (!adminFound) return res.status(401).json({ message: 'Niepoprawny login lub hasło' });
    if (!await bcrypt.compare(password, adminFound.password)) return res.status(401).json({ message: 'Niepoprawny login lub hasło' });

    const accessToken = jwt.sign({ id: adminFound.id }, process.env.ADMIN_JWT_SECRET as string, { expiresIn: process.env.JWT_TTL });
    const refreshToken = jwt.sign({ id: adminFound.id }, process.env.ADMIN_JWT_REFRESH_SECRET as string);

    try {
        await prisma.adminRefreshToken.create({
            data: {
                token: refreshToken
            }
        });
    } catch (err) {
        return res.sendStatus(500);
    }

    res.json({ accessToken, refreshToken });
});

authRoutes.post('/refresh', async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'Nie znaleziono tokena' });
    const tokenFound = await prisma.adminRefreshToken.findUnique({ where: { token } });
    if (!tokenFound) return res.status(401).json({ message: 'Token nieprawidłowy' });
    jwt.verify(token as string, process.env.ADMIN_JWT_REFRESH_SECRET as string, (err, user: any) => {
        if (err) return res.status(401).json({ message: err.message });
        const newPayload = { id: user.id };
        const newToken = jwt.sign(newPayload, process.env.ADMIN_JWT_SECRET as string, { expiresIn: process.env.JWT_TTL });
        res.json({ accessToken: newToken });
    });
});

authRoutes.delete('/logout', adminAuthentication, async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'Nie znaleziono tokena' });
    const tokenFound = await prisma.adminRefreshToken.findUnique({ where: { token } });
    if (!tokenFound) return res.status(401).json({ message: 'Token nieprawidłowy' });
    jwt.verify(token as string, process.env.ADMIN_JWT_REFRESH_SECRET as string, async (err, user: any) => {
        if (err) return res.status(401).json({ message: err.message });
        try {
            await prisma.adminRefreshToken.delete({ where: { token } });
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }
    });
});

authRoutes.get('/auth', adminAuthentication, async (req: Request, res: Response) => {
    res.sendStatus(204);
});

export { authRoutes };