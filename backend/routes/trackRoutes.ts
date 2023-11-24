import { Request, Response, Router } from 'express';
import { Movie, PrismaClient, Series, Track } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import isSubscriptionActive from '../middleware/isSubscriptionActive';
import feedUrls from '../utils/feedUrls';

const prisma = new PrismaClient();
const trackRoutes: Router = Router();

trackRoutes.get('/movie-track-string/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;

    const track = await prisma.track.findUnique({
        where: {
            movieId_userId: {
                userId: user.id,
                movieId: id
            }
        }
    });
    if (!track) return res.json({ message: null });
    res.json({ message: `Minuta: ${track.timestamp}` });
});

trackRoutes.get('/series-track-string/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;

    const episodes = await prisma.episode.findMany({ where: { seriesId: id }, select: { id: true } });
    let track: Track | null = null;

    for (const item of episodes) {
        const episodeTrack = await prisma.track.findUnique({
            where: {
                episodeId_userId: {
                    episodeId: item.id,
                    userId: user.id
                }
            }
        });

        if (episodeTrack) track = episodeTrack;
    }

    if (!track) return res.json({ message: null });

    const episode = await prisma.episode.findUnique({ where: { id: track.episodeId as string } });

    res.json({ message: `S${episode?.season}:O${episode?.episodeNumber}` });
});

trackRoutes.get('/my-tracks', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { user } = req.body;

    const tracks = await prisma.track.findMany({
        where: {
            userId: user.id,
            isOnHomepage: true
        },
        select: {
            episode: true,
            movie: true
        }
    });

    if (tracks.length > 0) {
        const productions = await Promise.all(tracks.map(async (item) => {
            if (item.movie) {
                return item.movie;
            } else if (item.episode) {
                const series = await prisma.series.findFirst({ where: { episodes: { some: { id: item.episode.id } } } });
                return series;
            }
        })) as (Movie | Series)[];

        const productionsWithURLs = await feedUrls(productions);

        res.json(productionsWithURLs);
    }
    else {
        res.json([]);
    }
});

trackRoutes.post('/update-series-track/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user, timestamp } = req.body;

    const track = await prisma.track.findUnique({
        where: {
            episodeId_userId: {
                episodeId: id,
                userId: user.id
            }
        }
    });
    if (track) await prisma.track.delete({ where: {id: track.id} });

    if (!timestamp) return res.status(422).json({ message: 'Znacznik czasowy jest wymagany' });
    const timestampNum = parseFloat(timestamp);
    if (isNaN(timestampNum)) return res.status(422).json({ message: 'Znacznik czasowy musi być liczbą' });

    try {
        await prisma.track.create({
            data: {
                isMovie: false,
                episodeId: id,
                userId: user.id,
                timestamp: timestampNum
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default trackRoutes;