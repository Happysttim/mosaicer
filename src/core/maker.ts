import type { double, Mat } from '@techstark/opencv-js';
import type { Tile } from './types/tile';
import type { OpenCV } from './types/opencv';

const Mosacier = {
  batchTile: (cv: OpenCV, tile: Tile, mat: Mat, alpha: double) => {
    const tileMat = tile.mat();
    const blended = new cv.Mat();
    let clonedMat: Mat;

    if (tileMat.channels() !== mat.channels()) {
      const newMat = new cv.Mat();

      switch (tileMat.channels()) {
        case 1: {
          const code =
            mat.channels() === 3 ? cv.COLOR_BGR2GRAY : cv.COLOR_RGBA2GRAY;
          cv.cvtColor(mat, newMat, code);
          break;
        }
        case 3: {
          const code =
            mat.channels() === 1 ? cv.COLOR_GRAY2BGR : cv.COLOR_RGBA2BGR;
          cv.cvtColor(mat, newMat, code);
          break;
        }
        default: {
          const code =
            mat.channels() === 1 ? cv.COLOR_GRAY2RGBA : cv.COLOR_BGR2RGBA;
          cv.cvtColor(mat, newMat, code);
          break;
        }
      }

      clonedMat = newMat;
    } else {
      clonedMat = mat.clone();
    }

    try {
      cv.addWeighted(tileMat, alpha, clonedMat, 1.0 - alpha, 0.0, blended);
      blended.copyTo(tileMat);
    } finally {
      blended.delete();
      clonedMat.delete();
      tileMat.delete();
    }
  },
};

export default Mosacier;
