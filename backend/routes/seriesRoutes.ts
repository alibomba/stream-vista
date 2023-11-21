import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import isSubscriptionActive from '../middleware/isSubscriptionActive';
import feedUrls from '../utils/feedUrls';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: process.env.AWS_BUCKET_REGION as string
});

const prisma = new PrismaClient();
const seriesRoutes: Router = Router();

seriesRoutes.get('/series-details/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const series = await prisma.series.findUnique({ where: { id } });
    if (!series) return res.status(404).json({ message: 'Serial nie istnieje' });
    const tempArr = [series];
    const arrWithURL = await feedUrls(tempArr);
    res.json(arrWithURL[0]);
});

seriesRoutes.get('/episodes/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    let season = req.query.season as string | number;
    if (!season) return res.status(422).json({ message: 'Sezon jest wymagany' });
    season = parseInt(season as string);
    if (isNaN(season)) return res.status(422).json({ message: 'Sezon musi być liczbą całkowitą' });
    const episodes = await prisma.episode.findMany({
        where: {
            seriesId: id,
            season
        }
    });
    if (episodes.length === 0) return res.status(404).json({ message: 'Nie znaleziono serialu' });
    const episodesWithURLs = await Promise.all(episodes.map(async episode => {
        const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: `series/episodes/thumbnails/${episode.thumbnailUrl}` });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return { ...episode, thumbnailUrl: url };
    }));
    res.json(episodesWithURLs);
});

export default seriesRoutes;