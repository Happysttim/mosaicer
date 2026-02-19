import Image from '@/core/image';
import Mosacier from '@/core/maker';
import { computeHistogram } from '@/core/utils/histogram';
import { bytesToMatRGBA } from '@/core/utils/toMat';
import type { LogType } from '@/types/logger';
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
  if (!main) {
    return;
  }

  let image: Image | undefined = undefined;
  const tileMats: Map<string, Mat> = new Map();

  try {
    const buffer = await main.arrayBuffer();
    image = new Image(cv, new Uint8Array(buffer), maxCount, scale, main.type);

    log('info', '메인 사진 전처리 가공을 시작합니다.');
    await image.make();
    log('info', '메인 사진 전처리 가공이 완료되었습니다.');
    log('info', '타일 이미지 변환을 시작합니다.');
    for (const [idx, tile] of tiles.entries()) {
      const tileBuffer = await tile.arrayBuffer();
      if (tileMats.has(tile.name)) continue;
      const mat = await bytesToMatRGBA(
        cv,
        new Uint8Array(tileBuffer),
        tile.type,
        image.tileLength(),
      );

      if (!mat) {
        log(
          'error',
          `타일 이미지(${tile.name}) 파일 오류: 지원하지 않는 MIME-Type(${tile.type})`,
        );
        continue;
      }

      tileMats.set(tile.name, mat);
      state('set', tile.name);
      log('info', `타일 변환 중...(${idx + 1}/${tiles.length})`);
    }

    log(
      'info',
      `타일 이미지 변환이 완료되었습니다. (전체 타일 이미지=${tiles.length}, 변환이 완료된 이미지=${tileMats.size})`,
    );

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

    log('info', `타일 이미지 배치 시작.`);
    const tileCount = image.tiles().length;
    image.tiles().forEach((tile, idx) => {
      const roi = tile.mat();
      const bestKey = mapKey(roi);
      Mosacier.batchTile(cv, tile, tileMats.get(bestKey)!, opacity);
      state('increment', bestKey);
      roi.delete();
      if (idx % 100 === 0) {
        const percentage = Math.floor(((idx + 1) / tileCount) * 100);
        process(percentage, `이미지 가공 중 (${percentage}%)`);
      }
    });

    const result = image.image();
    const imageData = new ImageData(
      new Uint8ClampedArray(result.data),
      result.cols,
      result.rows,
    );

    log('info', '이미지 가공이 완료되었습니다!');
    process(100, '이미지 가공이 완료되었습니다!', imageData);
  } catch (e) {
    log('error', e);
  } finally {
    if (image) {
      image.flush();
    }
    tileMats.clear();
  }
};

const log = (logType: LogType, message: string | unknown) => {
  postMessage({
    type: 'log',
    logMessage: {
      time: Date.now(),
      logType,
      message,
    },
  });
};

const process = (percentage: number, message: string, result?: ImageData) => {
  postMessage({
    type: 'process',
    percentage,
    message,
    result,
  });
};

const state = (state: 'increment' | 'set', fileName: string) => {
  postMessage({
    type: 'state',
    state,
    fileName,
  });
};
