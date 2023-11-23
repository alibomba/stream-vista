import e, { Request, Response, Router } from 'express';
import { PrismaClient, Track } from '@prisma/client';
import jwtAuthentication from '../middleware/jwtAuthentication';
import isSubscriptionActive from '../middleware/isSubscriptionActive';
import feedUrls from '../utils/feedUrls';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { EpisodeResponse } from '../types';

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

seriesRoutes.get('/series/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const series = await prisma.series.findUnique({ where: { id }, select: { title: true, episodes: true, categories: true } });
    if (!series) return res.status(404).json({ message: 'Nie znaleziono serialu' });
    let track: Track | null = null;
    for (const episode of series.episodes) {
        const trackFound = await prisma.track.findUnique({
            where: {
                episodeId_userId: {
                    episodeId: episode.id,
                    userId: user.id
                }
            }
        });
        if (trackFound) track = trackFound;
    }
    if (track) {
        const episode = await prisma.episode.findUnique({ where: { id: track.episodeId as string } });
        if (!episode) return res.sendStatus(404);
        const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: `series/episodes/${episode.sourceUrl}` });
        const url = await getSignedUrl(s3, command, { expiresIn: 5000 });
        res.json({ episodeId: episode.id, url, title: episode.title, episodeNumber: episode.episodeNumber, season: episode.season, timestamp: track.timestamp, categories: series.categories });
    } else {
        const episode = await prisma.episode.findFirst({
            where: {
                seriesId: id,
                season: 1,
                episodeNumber: 1
            }
        });
        if (!episode) return res.sendStatus(404);
        const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: `series/episodes/${episode.sourceUrl}` });
        const url = await getSignedUrl(s3, command, { expiresIn: 5000 });
        res.json({ episodeId: episode.id, url, title: episode.title, episodeNumber: episode.episodeNumber, season: episode.season, timestamp: 0, categories: series.categories });
    }
});

seriesRoutes.get('/next-episode/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const episode = await prisma.episode.findUnique({ where: { id }, include: { series: true } });
    if (!episode) return res.status(404).json({ message: 'Nie znaleziono odcinka' });
    const nextEpisode = await prisma.episode.findFirst({
        where: { seriesId: episode.seriesId, season: episode.season, episodeNumber: episode.episodeNumber + 1 }
    });
    let response: EpisodeResponse | null = null;
    if (!nextEpisode) {
        const nextSeasonFirstEpisode = await prisma.episode.findFirst({
            where: {
                seriesId: episode.seriesId, season: episode.season + 1, episodeNumber: 1
            }
        });
        if (!nextSeasonFirstEpisode) {
            res.status(404).json({ message: 'To ostatni odcinek tego serialu' });
        } else {
            const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: `series/episodes/${nextSeasonFirstEpisode.sourceUrl}` });
            const url = await getSignedUrl(s3, command, { expiresIn: 5000 });
            response = { episodeId: nextSeasonFirstEpisode.id, url, title: nextSeasonFirstEpisode.title, episodeNumber: nextSeasonFirstEpisode.episodeNumber, season: nextSeasonFirstEpisode.season, timestamp: 0, categories: episode.series.categories };
        }
    } else {
        const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: `series/episodes/${nextEpisode.sourceUrl}` });
        const url = await getSignedUrl(s3, command, { expiresIn: 5000 });
        response = { episodeId: nextEpisode.id, url, title: nextEpisode.title, episodeNumber: nextEpisode.episodeNumber, season: nextEpisode.season, timestamp: 0, categories: episode.series.categories };
    }

    if (response) {
        if (await prisma.track.findUnique({ where: { episodeId_userId: { episodeId: id, userId: user.id } } })) {
            try {
                await prisma.track.delete({
                    where: {
                        episodeId_userId: {
                            episodeId: id,
                            userId: user.id
                        }
                    }
                });
            } catch (err) {
                return res.sendStatus(500);
            }
        }
        res.json(response);
    }
});

seriesRoutes.get('/previous-episode/:id', jwtAuthentication, isSubscriptionActive, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req.body;
    const episode = await prisma.episode.findFirst({ where: { id }, include: { series: true } });
    if (!episode) return res.status(404).json({ message: 'Nie znaleziono odcinka' });
    const previousEpisode = await prisma.episode.findFirst({
        where: { seriesId: episode.seriesId, season: episode.season, episodeNumber: episode.episodeNumber - 1 }
    });
    let response: EpisodeResponse | null = null;
    if (!previousEpisode) {
        const previousSeasonEpisodes = await prisma.episode.findMany({
            where: { seriesId: episode.seriesId, season: episode.season - 1 }
        });
        if (previousSeasonEpisodes.length === 0) {
            return res.status(404).json({ message: 'To pierwszy odcinek tego serialu' });
        } else {
            const previousSeasonLastEpisode = previousSeasonEpisodes[previousSeasonEpisodes.length - 1];
            const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: `series/episodes/${previousSeasonLastEpisode.sourceUrl}` });
            const url = await getSignedUrl(s3, command, { expiresIn: 5000 });
            response = { episodeId: previousSeasonLastEpisode.id, url, title: previousSeasonLastEpisode.title, episodeNumber: previousSeasonLastEpisode.episodeNumber, season: previousSeasonLastEpisode.season, timestamp: 0, categories: episode.series.categories };
        }
    } else {
        const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: `series/episodes/${previousEpisode.sourceUrl}` });
        const url = await getSignedUrl(s3, command, { expiresIn: 5000 });
        response = { episodeId: previousEpisode.id, url, title: previousEpisode.title, episodeNumber: previousEpisode.episodeNumber, season: previousEpisode.season, timestamp: 0, categories: episode.series.categories };
    }

    if (response) {
        if (await prisma.track.findUnique({ where: { episodeId_userId: { episodeId: id, userId: user.id } } })) {
            try {
                await prisma.track.delete({
                    where: {
                        episodeId_userId: {
                            episodeId: id,
                            userId: user.id
                        }
                    }
                });
            } catch (err) {
                return res.sendStatus(500);
            }
        }
        res.json(response);
    }
});

export default seriesRoutes;