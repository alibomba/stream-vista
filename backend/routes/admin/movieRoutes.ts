import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import adminAuthentication from '../../middleware/adminAuthentication';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const movieRoutes: Router = Router();
const prisma = new PrismaClient();
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: process.env.AWS_BUCKET_REGION as string
});

movieRoutes.get('/movies', adminAuthentication, async (req: Request, res: Response) => {
    const movies = await prisma.movie.findMany({ select: { id: true, title: true, thumbnailUrl: true } });

    const moviesWithURLs = await Promise.all(movies.map(async (movie) => {
        const key = `movies/thumbnails/${movie.thumbnailUrl}`;
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: key
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        movie.thumbnailUrl = url;
        return movie;
    }));

    res.json(moviesWithURLs);
});

movieRoutes.delete('/movies/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.movie.findUnique({ where: { id } })) return res.sendStatus(404);
    try {
        await prisma.movie.delete({ where: { id } });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export { movieRoutes };