import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import isSubscriptionActive from '../middleware/isSubscriptionActive';
import feedUrls from '../utils/feedUrls';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { MovieResponse } from '../types';

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: process.env.AWS_BUCKET_REGION as string
});

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

movieRoutes.get('/movie/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;

    const movie = await prisma.movie.findUnique({ where: { id } });
    if (!movie) return res.status(404).json({ message: 'Nie znaleziono filmu' });
    const track = await prisma.track.findUnique({ where: { movieId_userId: { movieId: id, userId: user.id } } });

    const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: `movies/${movie.sourceUrl}` });
    const url = await getSignedUrl(s3, command, { expiresIn: 7500 });
    let response: MovieResponse = { movieId: movie.id, title: movie.title, timestamp: 0, url, categories: movie.categories };

    if (track) {
        response.timestamp = track.timestamp;
    }

    res.json(response);

});

export default movieRoutes;