import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import isSubscriptionActive from '../middleware/isSubscriptionActive';
import feedUrls from '../utils/feedUrls';

const prisma = new PrismaClient();
const movieRoutes: Router = Router();

movieRoutes.get('/movie-details/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const movie = await prisma.movie.findUnique({ where: { id } });
    if (!movie) return res.status(404).json({ message: 'Nie znaleziono filmu' });
    const tempArr = [movie];
    const arrWithURL = await feedUrls(tempArr);
    res.json(arrWithURL[0]);
});

export default movieRoutes;