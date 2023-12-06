import multer, { MulterError } from 'multer';

const storage = multer.memoryStorage();

const episodeUpload = multer({
    storage,
    limits: { fileSize: 300 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const videoMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/3gpp', 'video/3gpp2', 'video/x-matroska'];

        if (!videoMimeTypes.includes(file.mimetype)) {
            cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
        } else {
            cb(null, true);
        }
    }
}).fields([{ name: 'title' }, { name: 'description' }, { name: 'source' }, { name: 'season' }, { name: 'episodeNumber' }]);

export default episodeUpload;