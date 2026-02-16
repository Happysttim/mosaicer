import type * as cv from '@techstark/opencv-js';

declare global {
  interface Window {
    cv: typeof cv;
  }
}

export const cv: typeof cv;
