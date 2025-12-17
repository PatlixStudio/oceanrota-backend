import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function createUploadPath(path: string) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
  return path;
}

export const LISTING_UPLOAD_PATH = createUploadPath('./uploads/listings');

export const multerListingOptions = {
  storage: diskStorage({
    destination: LISTING_UPLOAD_PATH,
    filename: (req, file, cb) => {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, unique + extname(file.originalname));
    },
  }),
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images allowed'), false);
    }
    cb(null, true);
  },
};
