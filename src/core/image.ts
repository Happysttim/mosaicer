import type { OpenCV } from './types/opencv';
import type { Tile } from './types/tile';
import Extension from './utils/extension';
import { bytesToMatRGBA } from './utils/toMat';
import type { Mat } from '@techstark/opencv-js';

class Image {
  private readonly _bytes: Uint8Array;
  private readonly _maxTileCount: number;
  private readonly _upsize: number;
  private readonly _cv: OpenCV;
  private readonly _mimeType: string;

  private _width: number = 0;
  private _height: number = 0;
  private _tileLength: number = 0;
  private _tiles: Tile[] = [];

  private _image: Mat;

  constructor(
    cv: OpenCV,
    bytes: Uint8Array,
    maxTileCount: number = 5000,
    upsize: number = 1,
    mimeType: string = 'image/jpeg',
  ) {
    this._bytes = bytes;
    this._maxTileCount = maxTileCount;
    this._upsize = upsize;
    this._cv = cv;
    this._image = new cv.Mat();
    this._mimeType = mimeType;
  }

  width(): number {
    return this._width;
  }

  height(): number {
    return this._height;
  }

  tiles(): Tile[] {
    return this._tiles;
  }

  tileLength(): number {
    return this._tileLength;
  }

  image(): Mat {
    return this._image;
  }

  async make() {
    this._tiles = [];
    const ext = Extension.guess(this._bytes);
    if (ext === '.bin') return;

    const decoded = await bytesToMatRGBA(
      this._cv,
      new Uint8Array(this._bytes),
      this._mimeType,
    );

    if (!decoded) {
      throw new Error('Failed Make Tile');
    }

    try {
      const sqrtTileCount = Math.sqrt(this._maxTileCount);
      const tileLength = (this._tileLength = parseInt(
        Math.max(
          Math.ceil((decoded.cols * this._upsize) / sqrtTileCount),
          Math.ceil((decoded.rows * this._upsize) / sqrtTileCount),
        ).toFixed(0),
      ));

      this._cv.resize(
        decoded,
        this._image,
        new this._cv.Size(
          ((decoded.cols + this._tileLength - 1) / this._tileLength) *
            this._tileLength *
            this._upsize,
          ((decoded.rows + this._tileLength - 1) / this._tileLength) *
            this._tileLength *
            this._upsize,
        ),
        0.0,
        0.0,
        this._cv.INTER_AREA,
      );

      this._width = this._image.cols;
      this._height = this._image.rows;

      const tileWidthCount = Math.floor(this._width / this._tileLength);
      const tileHeightCount = Math.floor(this._height / this._tileLength);
      const total = tileWidthCount * tileHeightCount;
      const image = this._image;
      const cv = this._cv;

      for (let tileId = 0; tileId < total; tileId++) {
        const xIdx = tileId % tileWidthCount;
        const yIdx = Math.floor(tileId / tileWidthCount);

        const x = tileLength * xIdx;
        const y = tileLength * yIdx;

        this._tiles.push({
          tileId: () => tileId,
          length: () => tileLength,
          offsetX: () => x,
          offsetY: () => y,
          mat: () => image.roi(new cv.Rect(x, y, tileLength, tileLength)),
        });
      }
    } finally {
      decoded.delete();
    }
  }

  flush() {
    if (this._image) {
      this._image.delete();
      this._image = new this._cv.Mat(); // 재사용할 거면
    }
    this._tiles = [];
    this._width = 0;
    this._height = 0;
    this._tileLength = 0;
  }
}

export default Image;
