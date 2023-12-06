import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath(require('ffmpeg-static'));
import { unlinkSync, readFile } from 'fs';
import { v4 } from 'uuid';

function getVideoHalfFrame(tempVideoPath: string, halfDurationInSeconds: number): Promise<Buffer> {
    const framePath = `${__dirname}/../routes/admin/temp/${v4()}.jpg`;
    return new Promise((resolve, reject) => {
        ffmpeg(tempVideoPath)
            .seekInput(halfDurationInSeconds)
            .frames(1)
            .on('end', () => {
                unlinkSync(tempVideoPath);
                readFile(framePath, (err, data) => {
                    unlinkSync(framePath);
                    if (err || !data) reject();
                    resolve(data);
                })
            })
            .on('error', () => {
                reject();
            })
            .output(framePath)
            .run();
    });
}

export default getVideoHalfFrame;