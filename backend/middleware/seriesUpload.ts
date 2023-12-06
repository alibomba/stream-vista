import multer, { MulterError } from 'multer';

const storage = multer.memoryStorage();

const seriesCreate = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const videoMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/3gpp', 'video/3gpp2', 'video/x-matroska'];
        const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

        if (file.fieldname === 'thumbnail') {
            if (!imageMimeTypes.includes(file.mimetype)) {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'thumbnail'));
            } else {
                cb(null, true);
            }
        }
        else if (file.fieldname === 'trailer') {
            if (!videoMimeTypes.includes(file.mimetype)) {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'trailer'));
            } else {
                cb(null, true);
            }
        }
        else if (file.fieldname === 'episodesSources') {
            if (!videoMimeTypes.includes(file.mimetype)) {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'episodesSources'));
            } else {
                cb(null, true);
            }
        }
    }
}).fields([{ name: 'title' }, { name: 'description' }, { name: 'trailer' }, { name: 'thumbnail' }, { name: 'warnings' }, { name: 'actors' }, { name: 'creators' }, { name: 'categories' }, { name: 'seasons' }, { name: 'year' }, { name: 'episodesAmount' }, { name: 'episodes' }, { name: 'episodesSources' }]);

const seriesUpdate = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const videoMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/3gpp', 'video/3gpp2', 'video/x-matroska'];
        const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

        if (file.fieldname === 'thumbnail') {
            if (!imageMimeTypes.includes(file.mimetype)) {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'thumbnail'));
            } else {
                cb(null, true);
            }
        }
        else if (file.fieldname === 'trailer') {
            if (!videoMimeTypes.includes(file.mimetype)) {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'trailer'));
            } else {
                cb(null, true);
            }
        }
        else {
            cb(null, true);
        }
    }
}).fields([{ name: 'title' }, { name: 'description' }, { name: 'trailer' }, { name: 'thumbnail' }, { name: 'warnings' }, { name: 'actors' }, { name: 'creators' }, { name: 'categories' }, { name: 'seasons' }, { name: 'year' }]);

export { seriesCreate, seriesUpdate };