import type { ExtType } from '../types/ext';

const Extension = {
  guess: (bytes: Uint8Array): ExtType => {
    const header = bytes.subarray(0, 16);

    const hex = Array.from(header)
      .map((b) => b.toString(16).toUpperCase().padStart(2, '0'))
      .join(' ');

    if (hex.includes('66 74 79 70 61 76 69 66')) return '.avif';
    if (hex.includes('66 74 79 70 68 65 69 63')) return '.heic';
    // PNG
    if (hex.startsWith('89 50 4E 47 0D 0A 1A 0A')) return '.png';

    // JPG/JPEG
    if (hex.startsWith('FF D8 FF')) return '.jpg';

    // BMP
    if (hex.startsWith('42 4D')) return '.bmp';

    // WEBP: RIFF....WEBP
    if (
      hex.startsWith('52 49 46 46') && // RIFF
      hex.substring(24, 32) === '57 45 42 50' // WEBP
    ) {
      return '.webp';
    }

    return '.bin';
  },

  isImage: (bytes: Uint8Array): boolean => {
    return Extension.guess(bytes) !== '.bin';
  },
};

export default Extension;
