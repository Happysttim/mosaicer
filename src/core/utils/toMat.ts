import type { Mat } from '@techstark/opencv-js';
import type { OpenCV } from '../types/opencv';

const NOT_SUPPORT_MIME = new Set(['image/x-adobe-dng']);

const bytesToMatRGBA = async (
  cv: OpenCV,
  bytes: Uint8Array<ArrayBuffer>,
  mimeType: string,
  tileLength?: number | null,
): Promise<Mat | undefined> => {
  if (NOT_SUPPORT_MIME.has(mimeType)) {
    return undefined;
  }
  const blob = new Blob([bytes], { type: mimeType || 'image/jpeg' });
  const bitmap = await createImageBitmap(blob);

  const width = tileLength ?? bitmap.width;
  const height = tileLength ?? bitmap.height;

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, 0, 0, width, height);

  const imageData = ctx.getImageData(
    0,
    0,
    tileLength || bitmap.width,
    tileLength || bitmap.height,
  );

  bitmap.close();
  return cv.matFromImageData(imageData);
};

export { bytesToMatRGBA };
