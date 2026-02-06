import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'crypto';
import { Request } from 'express';

export const multerOptions = (type: 'avatar' | 'gallery' | 'document') => ({
  limits: { fileSize: type === 'document' ? 10_000_000 : 5_000_000 },
  fileFilter: (req: Request, file, cb) => {
    if (!file.mimetype.startsWith('image/') && type !== 'document') {
      return cb(new Error('Only images allowed'), false);
    }
    cb(null, true);
  },
  filename: (req, file, cb) => {
    // Try extension from original name
    let ext = path.extname(file.originalname);

    // Fallback to mimetype
    if (!ext) {
      const mimeExt = file.mimetype.split('/')[1];
      ext = mimeExt ? `.${mimeExt}` : '';
    }

    cb(null, `${type}_${randomUUID()}${ext}`);
  },
  storage: diskStorage({
    destination: (req, file, cb) => {
      const userId = (req as any).user.id;
      const listingId = req.params.id;

      const uploadPath = path.join(
        process.cwd(),
        'uploads',
        'users',
        String(userId),
        'listings',
        listingId,
        'gallery'
      );

      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    }
  }),
});
