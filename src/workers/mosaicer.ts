import Image from '@/core/image';
import Mosacier from '@/core/maker';
import { computeHistogram } from '@/core/utils/histogram';
import { bytesToMatRGBA } from '@/core/utils/toMat';
import type { ImageStore } from '@/types/worker';
import type { Mat } from '@techstark/opencv-js';

onmessage = (e: MessageEvent<ImageStore>) => {
  void mosaicer(e.data);
};

const mosaicer = async ({
  main,
  tiles,
  batchType,
  maxCount,
  opacity,
  scale,
}: ImageStore) => {
  const { opencv } = await import('@/core/opencv');
  const { cv } = await opencv();
  if (!main) return;
  const buffer = await main.arrayBuffer();
  const image = new Image(
    cv,
    new Uint8Array(buffer),
    maxCount,
    scale,
    main.type,
  );
  const tileMats: Map<string, Mat> = new Map();

  await image.make();

  for (const tile of tiles) {
    const tileBuffer = await tile.arrayBuffer();
    if (tileMats.has(tile.name)) continue;
    const mat = await bytesToMatRGBA(
      cv,
      new Uint8Array(tileBuffer),
      tile.type,
      image.tileLength(),
    );

    if (!mat) {
      console.error(`${tile.name} have not supported mime type: ${tile.type}`);
      continue;
    }

    tileMats.set(tile.name, mat);
  }

  let cloneTileMats = new Map(tileMats);
  const mapKey = (tile: Mat) => {
    let bestKey: string = '';
    if (batchType === 'histogram') {
      let bestScore = -Infinity;

      for (const [key, value] of tileMats.entries()) {
        const score = computeHistogram(cv, tile, value);
        if (score > bestScore) {
          bestScore = score;
          bestKey = key;
        }
      }
    } else {
      const keys = Array.from(cloneTileMats.keys());
      bestKey = keys[Math.floor(Math.random() * keys.length)];
      cloneTileMats.delete(bestKey);

      if (cloneTileMats.size === 0) {
        cloneTileMats = new Map(tileMats);
      }
    }

    return bestKey;
  };

  image.tiles().forEach((tile, idx) => {
    const roi = tile.mat();
    const bestKey = mapKey(roi);
    Mosacier.batchTile(cv, tile, tileMats.get(bestKey)!, opacity);
    roi.delete();
    if (idx % 10 === 0) {
      const percentage = Math.floor(((idx + 1) / image.tiles().length) * 100);
      postMessage({
        percentage,
        message: `현재 이미지 가공 중...(${percentage}%)`,
      });
    }
  });

  const result = image.image();
  const imageData = new ImageData(
    new Uint8ClampedArray(result.data),
    result.cols,
    result.rows,
  );

  postMessage({
    percentage: 100,
    message: `이미지 가공이 완료되었습니다...!`,
    result: imageData,
  });
  image.flush();
  tileMats.clear();
};
