import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import adminAuthentication from '../../middleware/adminAuthentication';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: process.env.AWS_BUCKET_REGION
});

const subtitleRoutes: Router = Router();
const prisma = new PrismaClient();

subtitleRoutes.get('/episode-source/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const episode = await prisma.episode.findUnique({ where: { id }, select: { sourceUrl: true } });
    if (!episode) return res.sendStatus(404);
    const key = `series/episodes/${episode.sourceUrl}`;
    const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: key });
    const url = await getSignedUrl(s3, command, { expiresIn: 5000 });
    res.json({ url });
});

subtitleRoutes.get('/movie-source/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const movie = await prisma.movie.findUnique({ where: { id }, select: { sourceUrl: true } });
    if (!movie) return res.sendStatus(404);
    const key = `movies/${movie.sourceUrl}`;
    const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: key });
    const url = await getSignedUrl(s3, command, { expiresIn: 7500 });
    res.json({ url });
});

subtitleRoutes.post('/episode-subtitles/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.episode.findUnique({ where: { id } })) return res.sendStatus(404);
    const { fromSecond, toSecond, language, content } = req.body;
    if (!fromSecond) return res.status(422).json({ message: 'Sekunda początkowa jest wymagana' });
    const fromSecondInt = parseInt(fromSecond);
    if (isNaN(fromSecondInt) || fromSecondInt < 0) return res.status(422).json({ message: 'Sekunda początkowa musi być dodatnią liczbą całkowitą' });
    if (!toSecond) return res.status(422).json({ message: 'Sekunda końcowa jest wymagana' });
    const toSecondInt = parseInt(toSecond);
    if (isNaN(toSecondInt) || toSecondInt < 0) return res.status(422).json({ message: 'Sekunda końcowa musi być dodatnią liczbą całkowitą' });
    if (!language) return res.status(422).json({ message: 'Język jest wymagany' });
    if (!content) return res.status(422).json({ message: 'Treść jest wymagana' });
    if (content.length > 255) return res.status(422).json({ message: 'Treść może mieć maksymalnie 255 znaków' });

    try {
        await prisma.subtitle.create({
            data: {
                startSecond: fromSecondInt,
                endSecond: toSecondInt,
                language,
                text: content,
                episodeId: id
            }
        });
        res.status(201).json({ message: 'Utworzono napis' });
    } catch (err) {
        res.sendStatus(500);
    }
});

subtitleRoutes.post('/movie-subtitles/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.movie.findUnique({ where: { id } })) return res.sendStatus(404);
    const { fromSecond, toSecond, language, content } = req.body;
    if (!fromSecond) return res.status(422).json({ message: 'Sekunda początkowa jest wymagana' });
    const fromSecondInt = parseInt(fromSecond);
    if (isNaN(fromSecondInt) || fromSecondInt < 0) return res.status(422).json({ message: 'Sekunda początkowa musi być dodatnią liczbą całkowitą' });
    if (!toSecond) return res.status(422).json({ message: 'Sekunda końcowa jest wymagana' });
    const toSecondInt = parseInt(toSecond);
    if (isNaN(toSecondInt) || toSecondInt < 0) return res.status(422).json({ message: 'Sekunda końcowa musi być dodatnią liczbą całkowitą' });
    if (!language) return res.status(422).json({ message: 'Język jest wymagany' });
    if (!content) return res.status(422).json({ message: 'Treść jest wymagana' });
    if (content.length > 255) return res.status(422).json({ message: 'Treść może mieć maksymalnie 255 znaków' });

    try {
        await prisma.subtitle.create({
            data: {
                startSecond: fromSecondInt,
                endSecond: toSecondInt,
                language,
                text: content,
                movieId: id
            }
        });
        res.status(201).json({ message: 'Utworzono napis' });
    } catch (err) {
        res.sendStatus(500);
    }
});

export { subtitleRoutes };