import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWTUser } from '../types';
import { OAuth2Client } from 'google-auth-library';
import jwtAuthentication from '../middleware/jwtAuthentication';

const authRoutes: Router = Router();
const prisma = new PrismaClient();
const authClient = new OAuth2Client();

authRoutes.post('/register', async (req: Request, res: Response) => {
    const { email, password, passwordConfirmation } = req.body;
    if (!email) return res.status(422).json({ message: 'Adres e-mail jest wymagany' });
    if (await prisma.user.findUnique({ where: { email } })) return res.status(422).json({ message: 'Adres e-mail jest już zajęty' });
    if (!password) return res.status(422).json({ message: 'Hasło jest wymagane' });
    if (password.length < 8) return res.status(422).json({ message: 'Hasło musi mieć przynajmniej 8 znaków' });
    if (password.length > 60) return res.status(422).json({ message: 'Hasło może mieć maksymalnie 60 znaków' });
    if (password !== passwordConfirmation) return res.status(422).json({ message: 'Hasła nie są takie same' });

    const passwordHash = await bcrypt.hash(password, 10);
    try {
        await prisma.user.create({
            data: {
                email,
                password: passwordHash,
                oAuth: false
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

authRoutes.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).json({ message: 'Niepoprawny e-mail lub hasło' });
    const userFound = await prisma.user.findUnique({ where: { email } });
    if (!userFound) return res.status(401).json({ message: 'Niepoprawny e-mail lub hasło' });
    if (!userFound.password) return res.status(401).json({ message: 'Zaloguj się za pomocą Google' });
    if (!await bcrypt.compare(password, userFound.password)) return res.status(401).json({ message: 'Niepoprawny e-mail lub hasło' });
    const JWTUser: JWTUser = { id: userFound.id, email: userFound.email };
    const accessToken = jwt.sign(JWTUser, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_TTL });
    const refreshToken = jwt.sign(JWTUser, process.env.JWT_REFRESH_SECRET as string);
    try {
        await prisma.refreshToken.create({
            data: {
                token: refreshToken
            }
        });
        res.json({ accessToken, refreshToken });
    } catch (err) {
        res.sendStatus(500);
    }
});

authRoutes.post('/google-login', async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'Token jest wymagany' });
    const ticket = await authClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const googleUser = ticket.getPayload();
    if (!googleUser) return res.status(401).json({ message: 'Niepoprawny token' });
    const userFound = await prisma.user.findUnique({ where: { email: googleUser.email } });
    if (!googleUser.email) return res.status(422).json({ message: 'Adres e-mail jest wymagany' });
    if (userFound) {
        const JWTUser: JWTUser = { id: userFound.id, email: userFound.email };
        const accessToken = jwt.sign(JWTUser, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_TTL });
        const refreshToken = jwt.sign(JWTUser, process.env.JWT_REFRESH_SECRET as string);
        try {
            await prisma.refreshToken.create({
                data: {
                    token: refreshToken
                }
            });
            res.json({ accessToken, refreshToken });
        } catch (err) {
            res.sendStatus(500);
        }
    } else {
        try {
            const newUser = await prisma.user.create({
                data: {
                    email: googleUser.email,
                    oAuth: true
                }
            });
            const JWTUser: JWTUser = { id: newUser.id, email: newUser.email };
            const accessToken = jwt.sign(JWTUser, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_TTL });
            const refreshToken = jwt.sign(JWTUser, process.env.JWT_REFRESH_SECRET as string);
            try {
                await prisma.refreshToken.create({
                    data: {
                        token: refreshToken
                    }
                });
                res.json({ accessToken, refreshToken });
            } catch (err) {
                res.sendStatus(500);
            }
        } catch (err) {
            res.sendStatus(500);
        }
    }
});

authRoutes.post('/refresh', async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'Nie znaleziono tokena' });
    const tokenInDB = await prisma.refreshToken.findUnique({ where: { token } });
    if (!tokenInDB) return res.status(401).json({ message: 'Token nieprawidłowy' });
    jwt.verify(token as string, process.env.JWT_REFRESH_SECRET as string, (err, user: any) => {
        if (err) return res.status(401).json({ message: err.message });
        const JWTUser: JWTUser = { id: user.id, email: user.email };
        const newToken = jwt.sign(JWTUser, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_TTL });
        res.json({ accessToken: newToken });
    });
});

authRoutes.get('/auth', jwtAuthentication, async (req: Request, res: Response) => {
    if (req.body.user) {
        const user = await prisma.user.findUnique({ where: { id: req.body.user.id } });
        if (!user) return res.sendStatus(404);
        res.json({ isPaid: user.isSubscriptionPaid });
    }
    else {
        res.status(401).json({ message: 'Token nieprawidłowy' });
    }
});

authRoutes.delete('/logout', jwtAuthentication, async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'Nie znaleziono tokena' });
    const tokenInDB = await prisma.refreshToken.findUnique({ where: { token } });
    if (!tokenInDB) return res.status(401).json({ message: 'Token nieprawidłowy' });
    jwt.verify(token as string, process.env.JWT_REFRESH_SECRET as string, async (err, user) => {
        if (err) return res.status(401).json({ message: err.message });
        try {
            await prisma.refreshToken.delete({ where: { token } });
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }
    });
});

export default authRoutes;