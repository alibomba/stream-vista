import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import adminAuthentication from '../../middleware/adminAuthentication';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import movieUpload from '../../middleware/movieUpload';
import { MulterError } from 'multer';
import { v4 } from 'uuid';
import { writeFileSync, promises } from 'fs';
import getVideoDuration from '../../utils/getVideoDuration';

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

movieRoutes.get('/movie/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    const movie = await prisma.movie.findUnique({ where: { id }, select: { title: true, description: true, warnings: true, actors: true, creators: true, categories: true, year: true } });
    if (!movie) return res.status(404).json({ message: 'Film nie istnieje' });
    res.json(movie);
});

movieRoutes.post('/movies', adminAuthentication, async (req: Request, res: Response) => {
    movieUpload(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    switch (err.field) {
                        case 'trailer':
                            return res.status(422).json({ message: 'Zwiastun musi być filmem' });
                            break;
                        case 'thumbnail':
                            return res.status(422).json({ message: 'Miniatura musi być obrazem' });
                            break;
                        case 'source':
                            return res.status(422).json({ message: 'Plik filmu musi być filmem' });
                            break;
                    }
                } else {
                    return res.sendStatus(500);
                }
            }
            else {
                return res.sendStatus(500);
            }
        }

        const { title, description, warnings, actors, creators, categories, year } = req.body;
        if (!title) return res.status(422).json({ message: 'Tytuł jest wymagany' });
        if (title.length > 150) return res.status(422).json({ message: 'Tytuł może mieć maksymalnie 150 znaków' });
        if (!description) return res.status(422).json({ message: 'Opis jest wymagany' });
        if (description.length > 700) return res.status(422).json({ message: 'Opis może mieć maksymalnie 700 znaków' });
        if (warnings && warnings.length > 300) return res.status(422).json({ message: 'Ostrzeżenia mogą mieć maksymalnie 300 znaków' });
        if (actors && actors.length > 300) return res.status(422).json({ message: 'Obsada może mieć maksymalnie 300 znaków' });
        if (!creators) return res.status(422).json({ message: 'Twórcy są wymagani' });
        if (creators.length > 300) return res.status(422).json({ message: 'Twórcy mogą mieć maksymalnie 300 znaków' });
        if (!categories) return res.status(422).json({ message: 'Kategorie są wymagane' });
        if (categories.length > 300) return res.status(422).json({ message: 'Kategorie mogą mieć maksymalnie 300 znaków' });
        if (!year) return res.status(422).json({ message: 'Rok jest wymagany' });

        let trailer;
        if (req.files && typeof req.files === 'object' && 'trailer' in req.files) {
            trailer = req.files['trailer'][0];
        } else return res.status(422).json({ message: 'Zwiastun jest wymagany' });
        if (trailer.size > 35 * 1024 * 1024) return res.status(422).json({ message: 'Zwiastun może mieć maksymalnie 35MB' });

        let thumbnail;
        if (req.files && typeof req.files === 'object' && 'thumbnail' in req.files) {
            thumbnail = req.files['thumbnail'][0];
        } else return res.status(422).json({ message: 'Miniatura jest wymagana' });
        if (thumbnail.size > 3 * 1024 * 1024) return res.status(422).json({ message: 'Miniatura może mieć maksymalnie 3MB' });

        let source;
        if (req.files && typeof req.files === 'object' && 'source' in req.files) {
            source = req.files['source'][0];
        } else return res.status(422).json({ message: 'Plik filmu jest wymagany' });
        if (source.size > 1024 * 1024 * 1024) return res.status(422).json({ message: 'Plik filmu może mieć maksymalnie 1GB' });

        const tempVideoPath = `${__dirname}/temp/${v4()}.mp4`;
        writeFileSync(tempVideoPath, source.buffer);

        let durationInSeconds;
        try {
            durationInSeconds = await getVideoDuration(tempVideoPath);
            await promises.unlink(tempVideoPath);
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

        const trailerFileName = `${v4()}.mp4`;
        const trailerKey = `movies/trailers/${trailerFileName}`;
        const trailerParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: trailerKey,
            Body: trailer.buffer,
            ContentType: trailer.mimetype
        };
        const trailerCommand = new PutObjectCommand(trailerParams);
        try {
            await s3.send(trailerCommand);
        } catch (err) {
            trailer.buffer = Buffer.from([]);
            return res.sendStatus(500);
        }
        trailer = trailerFileName;

        const thumbnailFileName = `${v4()}.jpg`;
        const thumbnailKey = `movies/thumbnails/${thumbnailFileName}`;
        const thumbnailParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: thumbnailKey,
            Body: thumbnail.buffer,
            ContentType: thumbnail.mimetype
        };
        const thumbnailCommand = new PutObjectCommand(thumbnailParams);
        try {
            await s3.send(thumbnailCommand);
        } catch (err) {
            thumbnail.buffer = Buffer.from([]);
            return res.sendStatus(500);
        }
        thumbnail = thumbnailFileName;

        const sourceFileName = `${v4()}.mp4`;
        const sourceKey = `movies/${sourceFileName}`;
        const sourceParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: sourceKey,
            Body: source.buffer,
            ContentType: source.mimetype
        };
        const sourceCommand = new PutObjectCommand(sourceParams);
        try {
            await s3.send(sourceCommand);
        } catch (err) {
            source.buffer = Buffer.from([]);
            return res.sendStatus(500);
        }
        source = sourceFileName;

        const actorsArr: string[] = JSON.parse(actors);
        const actorsLowercase = actorsArr.map(actor => actor.toLowerCase());
        const creatorsArr: string[] = JSON.parse(creators);
        const creatorsLowercase = creatorsArr.map(creator => creator.toLowerCase());

        try {
            await prisma.movie.create({
                data: {
                    title,
                    description,
                    trailerUrl: trailer,
                    thumbnailUrl: thumbnail,
                    sourceUrl: source,
                    actors: actorsLowercase,
                    creators: creatorsLowercase,
                    warnings: JSON.parse(warnings),
                    categories: JSON.parse(categories),
                    minutes: durationInSeconds / 60,
                    year: parseInt(year),
                }
            });
            res.status(201).json({ message: 'Utworzono film' });
        } catch (err) {
            res.sendStatus(500);
        }
    });
});

movieRoutes.put('/movies/:id', adminAuthentication, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!await prisma.movie.findUnique({ where: { id } })) return res.status(404).json({ message: 'Film nie istnieje' });
    movieUpload(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    switch (err.field) {
                        case 'trailer':
                            return res.status(422).json({ message: 'Zwiastun musi być filmem' });
                            break;
                        case 'thumbnail':
                            return res.status(422).json({ message: 'Miniatura musi być obrazem' });
                            break;
                        case 'source':
                            return res.status(422).json({ message: 'Plik filmu musi być filmem' });
                            break;
                    }
                } else {
                    return res.sendStatus(500);
                }
            }
            else {
                return res.sendStatus(500);
            }
        }

        const { title, description, warnings, actors, creators, categories, year } = req.body;
        if (!title) return res.status(422).json({ message: 'Tytuł jest wymagany' });
        if (title.length > 150) return res.status(422).json({ message: 'Tytuł może mieć maksymalnie 150 znaków' });
        if (!description) return res.status(422).json({ message: 'Opis jest wymagany' });
        if (description.length > 700) return res.status(422).json({ message: 'Opis może mieć maksymalnie 700 znaków' });
        if (warnings.length > 300) return res.status(422).json({ message: 'Ostrzeżenia mogą mieć maksymalnie 300 znaków' });
        if (actors.length > 300) return res.status(422).json({ message: 'Obsada może mieć maksymalnie 300 znaków' });
        if (!creators) return res.status(422).json({ message: 'Twórcy są wymagani' });
        if (creators.length > 300) return res.status(422).json({ message: 'Twórcy mogą mieć maksymalnie 300 znaków' });
        if (!categories) return res.status(422).json({ message: 'Kategorie są wymagane' });
        if (categories.length > 300) return res.status(422).json({ message: 'Kategorie mogą mieć maksymalnie 300 znaków' });
        if (!year) return res.status(422).json({ message: 'Rok jest wymagany' });

        let trailer;
        if (req.files && typeof req.files === 'object' && 'trailer' in req.files) {
            trailer = req.files['trailer'][0];
            if (trailer.size > 35 * 1024 * 1024) return res.status(422).json({ message: 'Zwiastun może mieć maksymalnie 35MB' });
        }

        let thumbnail;
        if (req.files && typeof req.files === 'object' && 'thumbnail' in req.files) {
            thumbnail = req.files['thumbnail'][0];
            if (thumbnail.size > 3 * 1024 * 1024) return res.status(422).json({ message: 'Miniatura może mieć maksymalnie 3MB' });
        }

        let source;
        if (req.files && typeof req.files === 'object' && 'source' in req.files) {
            source = req.files['source'][0];
            if (source.size > 1024 * 1024 * 1024) return res.status(422).json({ message: 'Plik filmu może mieć maksymalnie 1GB' });
        }

        if (trailer) {
            const trailerFileName = `${v4()}.mp4`;
            const trailerKey = `movies/trailers/${trailerFileName}`;
            const trailerParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: trailerKey,
                Body: trailer.buffer,
                ContentType: trailer.mimetype
            };
            const trailerCommand = new PutObjectCommand(trailerParams);
            try {
                await s3.send(trailerCommand);
            } catch (err) {
                trailer.buffer = Buffer.from([]);
                return res.sendStatus(500);
            }
            trailer = trailerFileName;
        }

        if (thumbnail) {
            const thumbnailFileName = `${v4()}.jpg`;
            const thumbnailKey = `movies/thumbnails/${thumbnailFileName}`;
            const thumbnailParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: thumbnailKey,
                Body: thumbnail.buffer,
                ContentType: thumbnail.mimetype
            };
            const thumbnailCommand = new PutObjectCommand(thumbnailParams);
            try {
                await s3.send(thumbnailCommand);
            } catch (err) {
                thumbnail.buffer = Buffer.from([]);
                return res.sendStatus(500);
            }
            thumbnail = thumbnailFileName;
        }

        let durationInSeconds;
        if (source) {
            const tempVideoPath = `${__dirname}/temp/${v4()}.mp4`;
            writeFileSync(tempVideoPath, source.buffer);

            try {
                durationInSeconds = await getVideoDuration(tempVideoPath);
                await promises.unlink(tempVideoPath);
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

            const sourceFileName = `${v4()}.mp4`;
            const sourceKey = `movies/${sourceFileName}`;
            const sourceParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: sourceKey,
                Body: source.buffer,
                ContentType: source.mimetype
            };
            const sourceCommand = new PutObjectCommand(sourceParams);
            try {
                await s3.send(sourceCommand);
            } catch (err) {
                source.buffer = Buffer.from([]);
                return res.sendStatus(500);
            }
            source = sourceFileName;
        }

        const actorsArr: string[] = JSON.parse(actors);
        const actorsLowercase = actorsArr.map(actor => actor.toLowerCase());
        const creatorsArr: string[] = JSON.parse(creators);
        const creatorsLowercase = creatorsArr.map(creator => creator.toLowerCase());

        try {
            await prisma.movie.update({
                where: { id },
                data: {
                    title,
                    description,
                    trailerUrl: trailer && trailer,
                    thumbnailUrl: thumbnail && thumbnail,
                    sourceUrl: source && source,
                    warnings: JSON.parse(warnings),
                    actors: actorsLowercase,
                    creators: creatorsLowercase,
                    categories: JSON.parse(categories),
                    year: parseInt(year),
                    minutes: durationInSeconds && durationInSeconds / 60
                }
            });
            res.sendStatus(204);
        } catch (err) {
            res.sendStatus(500);
        }

    });
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