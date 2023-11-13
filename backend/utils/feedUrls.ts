import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: process.env.AWS_BUCKET_REGION as string
});

async function feedUrls(recommendations: {
    categories: string[];
}[]) {
    return await Promise.all(recommendations.map(async (item) => {
        const production = item as unknown as { categories: string, sourceUrl: string | undefined, thumbnailUrl: string, trailerUrl: string };
        const isMovie = production.sourceUrl ? true : false;


        //thumbnail
        const thumbnailKey = `${isMovie ? 'movies' : 'series'}/thumbnails/${production.thumbnailUrl}`;
        const thumbnailCommand = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: thumbnailKey
        });
        const thumbnailUrl = await getSignedUrl(s3, thumbnailCommand, { expiresIn: 3600 });

        // trailer
        const trailerKey = `${isMovie ? 'movies' : 'series'}/trailers/${production.trailerUrl}`;
        const trailerCommand = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: trailerKey
        });
        const trailerUrl = await getSignedUrl(s3, trailerCommand, { expiresIn: 3600 });

        production.thumbnailUrl = thumbnailUrl;
        production.trailerUrl = trailerUrl;
        return production;
    }));
}

export default feedUrls;