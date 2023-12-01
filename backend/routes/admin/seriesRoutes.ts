import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import adminAuthentication from '../../middleware/adminAuthentication';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const seriesRoutes: Router = Router();
const prisma = new PrismaClient();
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: process.env.AWS_BUCKET_REGION as string
});

seriesRoutes.get('/series', adminAuthentication, async (req: Request, res: Response) => {
    const series = await prisma.series.findMany({ select: { id: true, title: true, thumbnailUrl: true } });

    const seriesWithURLs = await Promise.all(series.map(async (series) => {
        const key = `series/thumbnails/${series.thumbnailUrl}`;
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: key
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        series.thumbnailUrl = url;
        return series;
    }));

    res.json(seriesWithURLs);
});

seriesRoutes.delete('/series/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.series.findUnique({ where: { id } })) return res.sendStatus(404);
    try {
        await prisma.series.delete({ where: { id } });
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
});

export { seriesRoutes };