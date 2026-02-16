import cvModule from '@techstark/opencv-js';
import type { OpenCV } from './types/opencv';

let cached: Promise<{ cv: OpenCV }> | undefined = undefined;

const opencv = async (): Promise<{ cv: OpenCV }> => {
  if (cached) return cached;
  cached = (async () => {
    let cv;
    if (cvModule instanceof Promise) {
      cv = (await cvModule) as OpenCV;
    } else {
      if (cvModule.Mat) {
        // already initialized
        cv = cvModule;
      } else {
        await new Promise<void>((resolve) => {
          cvModule.onRuntimeInitialized = () => resolve();
        });
        cv = cvModule as OpenCV;
      }
    }
    return { cv };
  })();

  return cached;
};

export { opencv };
