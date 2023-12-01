import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import adminAuthentication from '../../middleware/adminAuthentication';

const categoryRoutes: Router = Router();
const prisma = new PrismaClient();

categoryRoutes.get('/categories', adminAuthentication, async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
});

categoryRoutes.post('/categories', adminAuthentication, async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) return res.status(422).json({ message: 'Nazwa jest wymagana' });
    if (name.length > 150) return res.status(422).json({ message: 'Nazwa kategorii może mieć maksymalnie 150 znaków' });
    try {
        const category = await prisma.category.create({
            data: {
                name
            }
        });
        res.status(201).json(category);
    } catch (err) {
        res.sendStatus(500);
    }
});

categoryRoutes.put('/categories/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(422).json({ message: 'Nazwa jest wymagana' });
    if (name.length > 150) return res.status(422).json({ message: 'Nazwa kategorii może mieć maksymalnie 150 znaków' });
    if (!await prisma.category.findUnique({ where: { id } })) return res.sendStatus(404);
    try {
        const category = await prisma.category.update({
            where: { id },
            data: {
                name
            }
        });
        res.json(category);
    } catch (err) {
        res.sendStatus(500);
    }
});

categoryRoutes.delete('/categories/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.category.findUnique({ where: { id } })) return res.sendStatus(404);
    try {
        await prisma.category.delete({ where: { id } });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export { categoryRoutes };