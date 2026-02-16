export type PostMessage = {
  percentage?: number;
  result?: ImageData;
  message: string;
};

export type ImageStore = {
  main: File | null;
  tiles: File[];

  batchType: 'histogram' | 'random';
  opacity: number;
  scale: number;
  maxCount: number;
};
