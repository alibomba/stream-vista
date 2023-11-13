import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import isSubscriptionActive from '../middleware/isSubscriptionActive';

const categoryRoutes: Router = Router();
const prisma = new PrismaClient();

categoryRoutes.get('/users-categories', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { user: { id } } = req.body;
    const user = await prisma.user.findUnique({ where: { id }, select: { preferencedCategories: true } });
    if (!user) return res.sendStatus(404);
    res.json(user.preferencedCategories);
});

categoryRoutes.get('/categories', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
});

categoryRoutes.post('/update-users-categories/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return res.sendStatus(404);
    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                preferencedCategories: {
                    push: category.name
                }
            }
        });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default categoryRoutes;