import { Request, Response, Router } from 'express';
import { Movie, PrismaClient, Series } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import isSubscriptionActive from '../middleware/isSubscriptionActive';
import feedUrls from '../utils/feedUrls';

const prisma = new PrismaClient();
const watchListRoutes: Router = Router();

watchListRoutes.get('/is-on-movie-watchlist/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;

    const listItem = await prisma.toWatch.findUnique({
        where: {
            userId_movieId: {
                movieId: id,
                userId: user.id
            }
        }
    });

    if (listItem) {
        res.json({ isOnWatchList: true });
    }
    else {
        res.json({ isOnWatchList: false });
    }
});

watchListRoutes.get('/is-on-series-watchlist/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;

    const listItem = await prisma.toWatch.findUnique({
        where: {
            userId_seriesId: {
                seriesId: id,
                userId: user.id
            }
        }
    });

    if (listItem) {
        res.json({ isOnWatchList: true });
    }
    else {
        res.json({ isOnWatchList: false });
    }
});

watchListRoutes.post('/toggle-on-movie-watchlist/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;

    const itemFound = await prisma.toWatch.findUnique({
        where: {
            userId_movieId: {
                movieId: id,
                userId: user.id
            }
        }
    });

    if (itemFound) {
        try {
            await prisma.toWatch.delete({
                where: {
                    userId_movieId: {
                        movieId: id,
                        userId: user.id
                    }
                }
            });
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }
    }
    else {
        try {
            await prisma.toWatch.create({
                data: {
                    movieId: id,
                    userId: user.id
                }
            });
            res.sendStatus(201);
        } catch (err) {
            res.sendStatus(500);
        }
    }

});

watchListRoutes.post('/toggle-on-series-watchlist/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;

    const itemFound = await prisma.toWatch.findUnique({
        where: {
            userId_seriesId: {
                seriesId: id,
                userId: user.id
            }
        }
    });

    if (itemFound) {
        try {
            await prisma.toWatch.delete({
                where: {
                    userId_seriesId: {
                        seriesId: id,
                        userId: user.id
                    }
                }
            });
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }
    }
    else {
        try {
            await prisma.toWatch.create({
                data: {
                    seriesId: id,
                    userId: user.id
                }
            });
            res.sendStatus(201);
        } catch (err) {
            res.sendStatus(500);
        }
    }

});

watchListRoutes.get('/my-list', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { user } = req.body;

    const listItems = await prisma.toWatch.findMany({
        where: {
            userId: user.id
        },
        select: {
            movie: true,
            series: true
        }
    });

    if (listItems.length > 0) {
        const productions = listItems.map(item => {
            if (item.movie) {
                return item.movie;
            } else if (item.series) {
                return item.series;
            }
        }) as (Movie | Series)[];

        const productionsWithURLs = await feedUrls(productions);
        res.json(productionsWithURLs);
    }
    else {
        res.json([]);
    }


});

export default watchListRoutes;