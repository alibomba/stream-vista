import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import adminAuthentication from '../../middleware/adminAuthentication';
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { seriesCreate, seriesUpdate } from '../../middleware/seriesUpload';
import { MulterError } from 'multer';
import { v4 } from 'uuid';
import { EpisodeParams } from '../../types';
import { writeFileSync, promises } from 'fs';
import getVideoDuration from '../../utils/getVideoDuration';
import getVideoHalfFrame from '../../utils/getVideoHalfFrame';

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

seriesRoutes.post('/series', adminAuthentication, async (req: Request, res: Response) => {
    seriesCreate(req, res, async err => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    if (err.field === 'thumbnail') {
                        return res.status(422).json({ message: 'Miniatura musi być obrazem' });
                    } else if (err.field === 'trailer') {
                        return res.status(422).json({ message: 'Zwiastun musi być filmem' });
                    } else if (err.field === 'episodesSources') {
                        return res.status(422).json({ message: 'Plik odcinka musi być filmem' });
                    }
                }
                else {
                    return res.sendStatus(500);
                }
            } else {
                return res.sendStatus(500);
            }
        }

        const { title, description, warnings, actors, creators, categories, seasons, year, episodesAmount, episodes } = req.body;
        let thumbnail;
        if (req.files && typeof req.files === 'object' && 'thumbnail' in req.files) {
            thumbnail = req.files['thumbnail'][0];
        }
        if (!thumbnail) return res.status(422).json({ message: 'Miniatura jest wymagana' });
        if (thumbnail.size > 3 * 1024 * 1024) return res.status(422).json({ message: 'Miniatura może mieć maksymalnie 3MB' });

        let trailer;
        if (req.files && typeof req.files === 'object' && 'trailer' in req.files) {
            trailer = req.files['trailer'][0];
        }
        if (!trailer) return res.status(422).json({ message: 'Zwiastun jest wymagany' });
        if (trailer.size > 35 * 1024 * 1024) return res.status(422).json({ message: 'Zwiastun może mieć maksymalnie 35MB' });

        if (!episodesAmount) return res.status(422).json({ message: 'Liczba odcinków jest wymagana' });
        const episodesAmountNumber = parseInt(episodesAmount);
        let episodesSources;
        if (req.files && typeof req.files === 'object' && 'episodesSources' in req.files) {
            episodesSources = req.files['episodesSources'];
            const sourcesLength = episodesSources.length;
            if (sourcesLength !== episodesAmountNumber) return res.status(422).json({ message: 'Każdy odcinek musi mieć plik źródłowy' });
        } else {
            return res.status(422).json({ message: 'Pliki odcinków są wymagane' });
        }
        if (!title) return res.status(422).json({ message: 'Tytuł jest wymagany' });
        if (title.length > 150) return res.status(422).json({ message: 'Tytuł może mieć maksymalnie 150 znaków' });
        if (!description) return res.status(422).json({ message: 'Opis jest wymagany' });
        if (description.length > 700) return res.status(422).json({ message: 'Opis może mieć maksymalnie 700 znaków' });
        if (!creators) return res.status(422).json({ message: 'Twórcy są wymagani' });
        if (creators.length > 300) return res.status(422).json({ message: 'Twórcy mogą mieć maksymalnie 300 znaków' });
        if (!categories) return res.status(422).json({ message: 'Kategorie są wymagane' });
        if (categories.length > 300) return res.status(422).json({ message: 'Kategorie mogą mieć maksymalnie 300 znaków' });
        if (!seasons) return res.status(422).json({ message: 'Liczba sezonów jest wymagana' });
        if (!year) return res.status(422).json({ message: 'Rok jest wymagany' });
        if (!episodes) return res.status(422).json({ message: 'Odcinki są wymagane' });

        const episodesArray: EpisodeParams[] = JSON.parse(episodes);
        const processedEpisodesArray = [];
        for (let i = 0; i < episodesAmountNumber; i++) {
            const episode = episodesArray[i];
            const episodeSource = episodesSources[i];
            if (episodeSource.size > 300 * 1024 * 1024) {
                episodeSource.buffer = Buffer.from([]);
                return res.status(422).json({ message: 'Odcinek może mieć maksymalnie 300MB' });
            }
            processedEpisodesArray.push({ ...episode, sourceFile: episodeSource });
        }

        const thumbnailFileName = `${v4()}.jpg`;
        const thumbnailKey = `series/thumbnails/${thumbnailFileName}`;
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

        const trailerFileName = `${v4()}.mp4`;
        const trailerKey = `series/trailers/${trailerFileName}`;
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

        const seriesId = v4();

        const actorsArr: string[] = JSON.parse(actors);
        const creatorsArr: string[] = JSON.parse(creators);
        const actorsLowercase = actorsArr.map(actor => actor.toLowerCase());
        const creatorsLowercase = creatorsArr.map(creator => creator.toLowerCase());

        try {
            await prisma.series.create({
                data: {
                    id: seriesId,
                    title,
                    description,
                    warnings: JSON.parse(warnings),
                    actors: actorsLowercase,
                    creators: creatorsLowercase,
                    categories: JSON.parse(categories),
                    seasons: parseInt(seasons),
                    year: parseInt(year),
                    trailerUrl: trailerFileName,
                    thumbnailUrl: thumbnailFileName
                }
            });
        } catch (err) {
            return res.sendStatus(500);
        }

        let response: { status: number, message: string } | null = null;
        for (const episode of processedEpisodesArray) {
            const deleteBuffer = () => { episode.sourceFile.buffer = Buffer.from([]); }
            if (!episode.sourceFile) {
                response = { message: 'Plik odcinka jest wymagany', status: 422 };
                break;
            }
            if (!episode.title) {
                deleteBuffer();
                response = { message: 'Tytuł odcinka jest wymagany', status: 422 };
                break;
            }
            if (episode.title.length > 150) {
                deleteBuffer();
                response = { message: 'Tytuł odcinka może mieć maksymalnie 150 znaków', status: 422 };
                break;
            }
            if (!episode.description) {
                deleteBuffer();
                response = { message: 'Opis odcinka jest wymagany', status: 422 };
                break;
            }
            if (episode.description.length > 700) {
                deleteBuffer();
                response = { message: 'Opis odcinka może mieć maksymalnie 700 znaków', status: 422 };
                break;
            }
            if (!episode.season) {
                deleteBuffer();
                response = { message: 'Sezon jest wymagany', status: 422 };
                break;
            }
            if (!episode.episodeNumber) {
                deleteBuffer();
                response = { message: 'Numer odcinka jest wymagany', status: 422 };
                break;
            }

            const tempVideoPath = `${__dirname}/temp/${v4()}.mp4`;
            writeFileSync(tempVideoPath, episode.sourceFile.buffer);

            let durationInSeconds;
            try {
                durationInSeconds = await getVideoDuration(tempVideoPath);
            } catch (err) {
                deleteBuffer();
                await promises.unlink(tempVideoPath);
                response = { message: 'duration retrieval', status: 500 };
                break;
            }
            if (!durationInSeconds) {
                deleteBuffer();
                await promises.unlink(tempVideoPath);
                response = { message: 'duration retrieval', status: 500 };
                break;
            }

            // nie dziala xd
            // const halfDurationInSeconds = durationInSeconds / 2;

            // let episodeThumbnailBuffer;
            // try {
            //     episodeThumbnailBuffer = await getVideoHalfFrame(tempVideoPath, halfDurationInSeconds);
            // } catch (err) {
            //     deleteBuffer();
            //     response = { message: 'getting frame', status: 500 };
            //     break;
            // }

            // const episodeThumbnailName = `${v4()}.jpg`;
            // const episodeThumbnailParams = {
            //     Bucket: process.env.AWS_BUCKET_NAME,
            //     Key: `series/episodes/thumbnails/${episodeThumbnailName}`,
            //     Body: episodeThumbnailBuffer,
            //     ContentType: 'image/jpeg'
            // };
            // const episodeThumbnailCommand = new PutObjectCommand(episodeThumbnailParams);
            // try {
            //     await s3.send(episodeThumbnailCommand);
            // } catch (err) {
            //     deleteBuffer();
            //     response = { message: 'uploading frame', status: 500 };
            //     break;
            // }

            const episodeFilename = `${v4()}.mp4`;
            const sourceParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `series/episodes/${episodeFilename}`,
                Body: episode.sourceFile.buffer,
                ContentType: episode.sourceFile.mimetype
            };
            const sourceCommand = new PutObjectCommand(sourceParams);
            try {
                await s3.send(sourceCommand);
            } catch (err) {
                deleteBuffer();
                await promises.unlink(tempVideoPath);
                response = { message: 'uploading source', status: 500 };
                break;
            }

            try {
                await prisma.episode.create({
                    data: {
                        title: episode.title,
                        description: episode.description,
                        season: episode.season,
                        episodeNumber: episode.episodeNumber,
                        thumbnailUrl: 'episode-thumbnail-placeholder.jpg',
                        sourceUrl: episodeFilename,
                        seriesId: seriesId,
                        minutes: durationInSeconds / 60
                    }
                });
                deleteBuffer();
                await promises.unlink(tempVideoPath);
            } catch (err: any) {
                deleteBuffer();
                await promises.unlink(tempVideoPath);
                response = { message: err.message, status: 500 };
                break;
            }
        }
        if (response) {
            await prisma.series.delete({ where: { id: seriesId } });
            const resp = response as { status: number, message: string };
            return res.status(resp.status).json({ message: resp.message });
        }
        res.status(201).json({ message: 'Utworzono serial' });
    });
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
                thumbnail.buffer = Buffer.from([]);
                return res.sendStatus(500);
            }
            thumbnail.buffer = Buffer.from([]);
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
            try {
                await s3.send(command);
            } catch (err) {
                trailer.buffer = Buffer.from([]);
                return res.sendStatus(500);
            }
            trailer.buffer = Buffer.from([]);
            trailer = fileName;
        }

        const actorsArr: string[] = JSON.parse(actors);
        const creatorsArr: string[] = JSON.parse(creators);
        const actorsLowercase = actorsArr.map(actor => actor.toLowerCase());
        const creatorsLowercase = creatorsArr.map(creator => creator.toLowerCase());

        try {
            await prisma.series.update({
                where: { id },
                data: {
                    title,
                    description,
                    warnings: JSON.parse(warnings),
                    actors: actorsLowercase,
                    creators: creatorsLowercase,
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