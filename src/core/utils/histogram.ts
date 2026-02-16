import type { Mat, double } from '@techstark/opencv-js';
import type { OpenCV } from '../types/opencv';

const computeHistogram = (cv: OpenCV, mat1: Mat, mat2: Mat): double => {
  const gray1 = new cv.Mat();
  const gray2 = new cv.Mat();

  cv.cvtColor(mat1, gray1, cv.COLOR_BGR2GRAY);
  cv.cvtColor(mat2, gray2, cv.COLOR_BGR2GRAY);

  if (gray1.empty() || gray2.empty()) {
    throw Error('Empty Mat');
  }

  const hist1 = new cv.Mat();
  const hist2 = new cv.Mat();

  const images1 = new cv.MatVector();
  const images2 = new cv.MatVector();

  images1.push_back(gray1);
  images2.push_back(gray2);

  const channels = [0];
  const histSize = [256];
  const ranges = [0, 256];

  cv.calcHist(images1, channels, new cv.Mat(), hist1, histSize, ranges);
  cv.calcHist(images2, channels, new cv.Mat(), hist2, histSize, ranges);

  cv.normalize(hist1, hist1);
  cv.normalize(hist2, hist2);

  const score = cv.compareHist(hist1, hist2, cv.HISTCMP_CORREL);

  images1.delete();
  images2.delete();
  hist1.delete();
  hist2.delete();
  gray1.delete();
  gray2.delete();

  return score;
};

export { computeHistogram };
