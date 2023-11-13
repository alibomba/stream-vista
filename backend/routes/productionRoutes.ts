import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import isSubscriptionActive from '../middleware/isSubscriptionActive';
import sortRecommendations from '../utils/sortRecommendations';
import feedUrls from '../utils/feedUrls';


const productionRoutes: Router = Router();
const prisma = new PrismaClient();

productionRoutes.get('/feed', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { user: { id } } = req.body;
    const { single } = req.query;
    const user = await prisma.user.findUnique({ where: { id }, select: { preferencedCategories: true } });
    if (!user) return res.sendStatus(404);

    const recommendations = await prisma.$transaction([
        prisma.movie.findMany(),
        prisma.series.findMany()
    ]);

    const orderedRecommendations = sortRecommendations(recommendations, user.preferencedCategories);

    var trimmedRecommendations;
    if (single) {
        trimmedRecommendations = [orderedRecommendations[0]];
    }
    else {
        trimmedRecommendations = orderedRecommendations;
    }

    const recommendationsWithURLs = await feedUrls(trimmedRecommendations);

    res.json(recommendationsWithURLs);
});

productionRoutes.get('/series-feed', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { user: { id } } = req.body;
    const user = await prisma.user.findUnique({ where: { id }, select: { preferencedCategories: true } });
    if (!user) return res.sendStatus(404);

    const recommendations = await prisma.$transaction([
        prisma.series.findMany()
    ]);

    const orderedRecommendations = sortRecommendations(recommendations, user.preferencedCategories);

    const recommendationsWithURLs = await feedUrls(orderedRecommendations);

    res.json(recommendationsWithURLs);
});

productionRoutes.get('/movie-feed', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { user: { id } } = req.body;
    const user = await prisma.user.findUnique({ where: { id }, select: { preferencedCategories: true } });
    if (!user) return res.sendStatus(404);

    const recommendations = await prisma.$transaction([
        prisma.movie.findMany()
    ]);

    const orderedRecommendations = sortRecommendations(recommendations, user.preferencedCategories);

    const recommendationsWithURLs = await feedUrls(orderedRecommendations);

    res.json(recommendationsWithURLs);
});

productionRoutes.get('/search', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { user: { id } } = req.body;
    const user = await prisma.user.findUnique({ where: { id }, select: { preferencedCategories: true } });
    if (!user) return res.sendStatus(404);
    const phraseParam = req.query.phrase as string | undefined;
    if (!phraseParam) return res.status(422).json({ message: 'Fraza jest wymagana' });
    const phrase = phraseParam.toLowerCase();

    const results = await prisma.$transaction([
        prisma.series.findMany({
            where: {
                OR: [
                    {
                        actors: { has: phrase }
                    },
                    {
                        categories: { has: phrase }
                    },
                    {
                        creators: { has: phrase }
                    },
                    {
                        description: { contains: phrase, mode: 'insensitive' }
                    },
                    {
                        title: { contains: phrase, mode: 'insensitive' }
                    },
                    {
                        episodes: {
                            some: {
                                OR: [
                                    {
                                        title: { contains: phrase, mode: 'insensitive' }
                                    },
                                    {
                                        description: { contains: phrase, mode: 'insensitive' }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }),
        prisma.movie.findMany({
            where: {
                OR: [
                    {
                        actors: { has: phrase }
                    },
                    {
                        categories: { has: phrase }
                    },
                    {
                        creators: { has: phrase }
                    },
                    {
                        description: { contains: phrase, mode: 'insensitive' }
                    },
                    {
                        title: { contains: phrase, mode: 'insensitive' }
                    }
                ]
            }
        })
    ]);

    const orderedResults = sortRecommendations(results, user.preferencedCategories);

    const resultsWithURLs = await feedUrls(orderedResults);

    res.json(resultsWithURLs);
});

productionRoutes.get('/similar-productions', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const categoriesParam = req.query.categories as string | undefined;
    if (!categoriesParam) return res.status(422).json({ message: 'Kategorie są wymagane' });
    const categories = JSON.parse(categoriesParam);

    const recommendations = await prisma.$transaction([
        prisma.movie.findMany(),
        prisma.series.findMany()
    ]);

    const orderedRecommendations = sortRecommendations(recommendations, categories);

    var trimmedRecommendations;
    if (orderedRecommendations.length <= 6) {
        trimmedRecommendations = orderedRecommendations;
    }
    else {
        trimmedRecommendations = [orderedRecommendations[0], orderedRecommendations[1], orderedRecommendations[2], orderedRecommendations[3], orderedRecommendations[4], orderedRecommendations[5]];
    }

    const recommendationsWithURLs = await feedUrls(trimmedRecommendations);


    res.json(recommendationsWithURLs);
});

export default productionRoutes;