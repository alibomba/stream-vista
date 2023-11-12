import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

function jwtAuthentication(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) return res.status(401).json({ message: 'Nie znaleziono tokena' });
    jwt.verify(accessToken as string, process.env.JWT_SECRET as string, (err, user) => {
        if (err) return res.status(401).json({ message: err.message });
        if (user) {
            req.body.user = user;
            next();
        }
        else {
            return res.status(401).json({ message: 'Token nieprawidłowy' });
        }
    });
}

export default jwtAuthentication;