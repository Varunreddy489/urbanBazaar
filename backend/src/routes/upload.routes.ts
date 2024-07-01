import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Optional: Add file filter to restrict file types
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // Accept image files only
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.') as any, false);
    }
};

// Initialize Multer with storage and file filter
const upload = multer({ storage, fileFilter });

// Handle file upload
router.post('/', upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.send({ url: fileUrl });
});

// Serve uploaded files
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

export { router as uploadRoutes };
    