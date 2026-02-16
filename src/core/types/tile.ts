import { type Mat } from '@techstark/opencv-js';

interface Tile {
  tileId: () => number;
  offsetX: () => number;
  offsetY: () => number;
  length: () => number;
  mat: () => Mat;
}

export type { Tile };
