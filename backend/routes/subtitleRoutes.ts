import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import isSubscriptionActive from '../middleware/isSubscriptionActive';

const subtitleRoutes: Router = Router();
const prisma = new PrismaClient();

subtitleRoutes.get('/episode-subtitles/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.episode.findUnique({ where: { id } })) return res.status(404).json({ message: 'Odcinek nie istnieje' });
    const subtitles = await prisma.subtitle.findMany({ where: { episodeId: id } });
    res.json(subtitles);
});

subtitleRoutes.get('/movie-subtitles/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.movie.findUnique({ where: { id } })) return res.status(404).json({ message: 'Film nie istnieje' });
    const subtitles = await prisma.subtitle.findMany({ where: { movieId: id } });
    res.json(subtitles);
});

export default subtitleRoutes;