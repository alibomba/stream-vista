import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import adminAuthentication from '../../middleware/adminAuthentication';
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { seriesUpdate } from '../../middleware/seriesUpload';
import { MulterError } from 'multer';
import { v4 } from 'uuid';

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

seriesRoutes.get('/series/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const series = await prisma.series.findUnique({ where: { id }, select: { title: true, description: true, trailerUrl: true, thumbnailUrl: true, warnings: true, actors: true, creators: true, categories: true, seasons: true, year: true } });
    if (!series) return res.sendStatus(404);

    res.json(series);
});

seriesRoutes.put('/series/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    seriesUpdate(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    if (err.field === 'thumbnail') {
                        return res.status(422).json({ message: 'Miniatura musi być obrazem' });
                    } else if (err.field === 'trailer') {
                        return res.status(422).json({ message: 'Zwiastun musi być filmem' });
                    }
                }
                return res.sendStatus(500);
            }
            else {
                return res.sendStatus(500);
            }
        }
        const series = await prisma.series.findUnique({ where: { id } });
        if (!series) return res.status(404).json({ message: 'Nie znaleziono serialu' });
        const { title, description, warnings, actors, creators, categories, seasons, year } = req.body;
        let thumbnail;
        let trailer;
        if (req.files && typeof req.files === 'object' && 'thumbnail' in req.files) {
            thumbnail = req.files['thumbnail'][0];
            if (thumbnail.size > 1024 * 1024 * 3) {
                return res.status(422).json({ message: 'Miniatura może mieć maksymalnie 3MB' });
            }
        }
        if (req.files && typeof req.files === 'object' && 'trailer' in req.files) {
            trailer = req.files['trailer'][0];
            if (trailer.size > 1024 * 1024 * 35) {
                return res.status(422).json({ message: 'Zwiastun może mieć maksymalnie 35MB' });
            }
        }

        if (!title) {
            return res.status(422).json({ message: 'Tytuł jest wymagany' });
        }
        if (title.length > 150) {
            return res.status(422).json({ message: 'Tytuł może mieć maksymalnie 150 znaków' });
        }
        if (!description) {
            return res.status(422).json({ message: 'Opis jest wymagany' });
        }
        if (description.length > 700) {
            return res.status(422).json({ message: 'Opis może mieć maksymalnie 700 znaków' });
        }
        if (!creators) {
            return res.status(422).json({ message: 'Twórcy są wymagani' });
        }
        if (creators.length > 300) {
            return res.status(422).json({ message: 'Twórcy mogą mieć maksymalnie 300 znaków' });
        }
        if (!categories) {
            return res.status(422).json({ message: 'Kategorie są wymagane' });
        }
        if (categories.length > 300) {
            return res.status(422).json({ message: 'Kategorie mogą mieć maksymalnie 300 znaków' });
        }
        if (!seasons) {
            return res.status(422).json({ message: 'Liczba sezonów jest wymagana' });
        }
        if (!year) {
            return res.status(422).json({ message: 'Rok jest wymagany' });
        }

        if (thumbnail) {
            const deleteParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `/series/thumbnails/${series.thumbnailUrl}`
            };
            const deleteCommand = new DeleteObjectCommand(deleteParams);
            try {
                await s3.send(deleteCommand);
            } catch (err) {
                return res.sendStatus(500);
            }

            const fileName = `${v4()}.jpg`;
            const key = `series/thumbnails/${fileName}`;
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
                Body: thumbnail.buffer,
                ContentType: thumbnail.mimetype
            };
            const command = new PutObjectCommand(params);
            try {
                await s3.send(command);
            } catch (err) {
                return res.sendStatus(500);
            }
            thumbnail = fileName;
        }
        if (trailer) {
            const deleteParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `/series/trailers/${series.trailerUrl}`
            };
            const deleteCommand = new DeleteObjectCommand(deleteParams);
            try {
                await s3.send(deleteCommand);
            } catch (err) {
                return res.sendStatus(500);
            }

            const fileName = `${v4()}.mp4`;
            const key = `series/trailers/${fileName}`;
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
                Body: trailer.buffer,
                ContentType: trailer.mimetype
            };
            const command = new PutObjectCommand(params);
            await s3.send(command);
            trailer = fileName;
        }

        try {
            await prisma.series.update({
                where: { id },
                data: {
                    title,
                    description,
                    warnings: JSON.parse(warnings),
                    actors: JSON.parse(actors),
                    creators: JSON.parse(creators),
                    categories: JSON.parse(categories),
                    seasons: parseInt(seasons),
                    year: parseInt(year),
                    trailerUrl: trailer && trailer,
                    thumbnailUrl: thumbnail && thumbnail
                }
            });
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }
    });
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