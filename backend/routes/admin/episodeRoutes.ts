import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import adminAuthentication from '../../middleware/adminAuthentication';
import episodeUpload from '../../middleware/episodeUpload';
import { MulterError } from 'multer';
import { v4 } from 'uuid';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import getVideoDuration from '../../utils/getVideoDuration';
import { writeFileSync, promises } from 'fs';

const episodeRoutes: Router = Router();
const prisma = new PrismaClient();
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: process.env.AWS_BUCKET_REGION
});

episodeRoutes.get('/episode/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const episode = await prisma.episode.findUnique({ where: { id }, select: { title: true, description: true, sourceUrl: true, season: true, episodeNumber: true } });
    if (!episode) return res.status(404).json({ message: 'Odcinek nie istnieje' });
    res.json(episode);
});

episodeRoutes.post('/episode/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.series.findUnique({ where: { id } })) return res.status(422).json({ message: 'Serial nie istnieje' });
    episodeUpload(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(422).json({ message: 'Plik odcinka musi być filmem' });
                }
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(422).json({ message: 'Plik odcinka może mieć maksymalnie 300MB' });
                }
                return res.sendStatus(500);
            } else {
                return res.sendStatus(500);
            }
        }

        const { title, description, season, episodeNumber } = req.body;
        let source;
        if (req.files && typeof req.files === 'object' && 'source' in req.files) {
            source = req.files['source'][0];
        } else return res.status(422).json({ message: 'Plik odcinka jest wymagany' });

        if (!title) return res.status(422).json({ message: 'Tytuł jest wymagany' });
        if (title.length > 150) return res.status(422).json({ message: 'Tytuł może mieć maksymalnie 150 znaków' });
        if (!description) return res.status(422).json({ message: 'Opis jest wymagany' });
        if (description.length > 700) return res.status(422).json({ message: 'Opis może mieć maksymalnie 700 znaków' });
        if (!season) return res.status(422).json({ message: 'Sezon jest wymagany' });
        if (!episodeNumber) return res.status(422).json({ message: 'Numer odcinka jest wymagany' });



        const tempVideoPath = `${__dirname}/temp/${v4()}.mp4`;
        writeFileSync(tempVideoPath, source.buffer);

        let durationInSeconds;
        try {
            durationInSeconds = await getVideoDuration(tempVideoPath);
        } catch (err) {
            source.buffer = Buffer.from([]);
            await promises.unlink(tempVideoPath);
            return res.sendStatus(500);
        }
        if (!durationInSeconds) {
            source.buffer = Buffer.from([]);
            await promises.unlink(tempVideoPath);
            return res.sendStatus(500);
        }

        const key = `series/episodes/${v4()}.mp4`;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: source.buffer,
            ContentType: source.mimetype
        };
        const command = new PutObjectCommand(params);
        try {
            await s3.send(command);
        } catch (err) {
            source.buffer = Buffer.from([]);
            return res.sendStatus(500);
        }
        source = key;

        try {
            await prisma.episode.create({
                data: {
                    title,
                    description,
                    sourceUrl: source,
                    thumbnailUrl: 'episode-thumbnail-placeholder.jpg',
                    season: parseInt(season),
                    episodeNumber: parseInt(episodeNumber),
                    minutes: durationInSeconds / 60,
                    seriesId: id
                }
            });
            res.status(201).json({ message: 'Utworzono odcinek' });
        } catch (err) {
            res.sendStatus(500);
        }
    });
});

episodeRoutes.put('/episode/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.episode.findUnique({ where: { id } })) return res.status(422).json({ message: 'Odcinek nie istnieje' });
    episodeUpload(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(422).json({ message: 'Plik odcinka musi być filmem' });
                }
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(422).json({ message: 'Plik odcinka może mieć maksymalnie 300MB' });
                }
                return res.sendStatus(500);
            } else {
                return res.sendStatus(500);
            }
        }

        const { title, description, season, episodeNumber } = req.body;
        let source;
        if (req.files && typeof req.files === 'object' && 'source' in req.files) {
            source = req.files['source'][0];
        }

        if (!title) return res.status(422).json({ message: 'Tytuł jest wymagany' });
        if (title.length > 150) return res.status(422).json({ message: 'Tytuł może mieć maksymalnie 150 znaków' });
        if (!description) return res.status(422).json({ message: 'Opis jest wymagany' });
        if (description.length > 700) return res.status(422).json({ message: 'Opis może mieć maksymalnie 700 znaków' });
        if (!season) return res.status(422).json({ message: 'Sezon jest wymagany' });
        if (!episodeNumber) return res.status(422).json({ message: 'Numer odcinka jest wymagany' });

        if (source) {
            const key = `series/episodes/${v4()}.mp4`;
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
                Body: source.buffer,
                ContentType: source.mimetype
            };
            const command = new PutObjectCommand(params);
            try {
                await s3.send(command);
            } catch (err) {
                source.buffer = Buffer.from([]);
                return res.sendStatus(500);
            }
            source = key;
        }

        try {
            await prisma.episode.update({
                where: { id },
                data: {
                    title,
                    description,
                    sourceUrl: source && source,
                    season: parseInt(season),
                    episodeNumber: parseInt(episodeNumber)
                }
            });
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }
    });
});

export { episodeRoutes };