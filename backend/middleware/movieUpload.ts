import multer, { MulterError } from 'multer';

const storage = multer.memoryStorage();

const movieUpload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const videoMimeTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/3gpp', 'video/3gpp2', 'video/x-matroska'];
        const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

        if (file.fieldname === 'trailer') {
            if (!videoMimeTypes.includes(file.mimetype)) {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'trailer'));
            } else {
                cb(null, true);
            }
        } else if (file.fieldname === 'thumbnail') {
            if (!imageMimeTypes.includes(file.mimetype)) {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'thumbnail'));
            } else {
                cb(null, true);
            }
        } else if (file.fieldname === 'source') {
            if (!videoMimeTypes.includes(file.mimetype)) {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'source'));
            } else {
                cb(null, true);
            }
        }
    }
}).fields([{ name: 'title' }, { name: 'description' }, { name: 'trailer' }, { name: 'thumbnail' }, { name: 'source' }, { name: 'warnings' }, { name: 'actors' }, { name: 'creators' }, { name: 'categories' }, { name: 'year' }]);

export default movieUpload;