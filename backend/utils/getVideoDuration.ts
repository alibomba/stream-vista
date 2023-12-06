import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath(require('ffmpeg-static'));

function getVideoDuration(tempVideoPath: string): Promise<number | undefined> {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(tempVideoPath, (err, metadata) => {
            if (err) {
                reject(err);
            }
            const durationInSeconds = metadata.format.duration;
            resolve(durationInSeconds);
        });
    });
}

export default getVideoDuration;
