import * as fs from 'fs';
import * as path from 'path';

export function moveFiles(
  userId: number,
  listingId: string,
  files: Express.Multer.File[],
  type: 'gallery' | 'avatar',
): string[] {
  const tempPath = path.join(process.cwd(), 'uploads', 'users', String(userId), 'listings', 'temp', type);
  const finalPath = path.join(process.cwd(), 'uploads', 'users', String(userId), 'listings', listingId, type);

  fs.mkdirSync(finalPath, { recursive: true });

  const urls: string[] = [];
  for (const file of files) {
    const fileName = file.filename;
    const src = path.join(tempPath, fileName);
    const dest = path.join(finalPath, fileName);

    fs.renameSync(src, dest);
    urls.push(`/uploads/users/${userId}/listings/${listingId}/${type}/${fileName}`);
  }

  // Remove temp folder if empty
  if (fs.existsSync(tempPath) && fs.readdirSync(tempPath).length === 0) {
    fs.rmdirSync(tempPath, { recursive: true });
  }

  return urls;
}
