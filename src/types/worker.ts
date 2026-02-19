import type { LogMessage } from './logger';

export type PostMessage =
  | {
      type: 'process';
      percentage: number;
      message: string;
      result?: ImageData;
    }
  | {
      type: 'log';
      logMessage: LogMessage;
    }
  | {
      type: 'state';
      state: 'increment' | 'set';
      fileName: string;
    };

export type ImageStore = {
  main: File | null;
  tiles: File[];

  batchType: 'histogram' | 'random';
  opacity: number;
  scale: number;
  maxCount: number;
};
