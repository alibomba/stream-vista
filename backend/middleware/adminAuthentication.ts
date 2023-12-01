import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

async function adminAuthentication(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (accessToken) {
        jwt.verify(accessToken, process.env.ADMIN_JWT_SECRET as string, async (err, user: any) => {
            if (err) return res.status(401).json({ message: err.message });
            const adminFound = await prisma.admin.findUnique({ where: { id: user.id } });
            if (!adminFound) return res.status(401).json({ message: 'Administrator nie istnieje' });
            next();
        })
    } else {
        return res.status(401).json({ message: 'Nie znaleziono tokena' });
    }
}

export default adminAuthentication;