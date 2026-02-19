import type { TileCounter } from '@/types/state';
import { create } from 'zustand';

interface ImageState {
  main: File | null;
  tiles: File[];
  urls: Map<string, string>;

  batchType: 'histogram' | 'random';
  opacity: number;
  scale: number;
  maxCount: number;

  tileCounter: Map<string, TileCounter>;

  setUrl: (fileNmae: string, url: string) => void;
  deleteUrl: (fileName: string) => void;
  setMain: (file: File) => void;
  deleteMain: () => void;
  appendTile: (...tiles: File[]) => void;
  setTiles: (tiles: File[]) => void;
  setBatchType: (batchType: 'histogram' | 'random') => void;
  setOpacity: (opaticy: number) => void;
  setScale: (scale: number) => void;
  setMaxCount: (maxCount: number) => void;
  setTileCount: (fileName: string, tileCount: TileCounter) => void;
  incrementCount: (fileName: string) => void;

  hasCount: (fileName: string) => boolean;

  reset: () => void;
}

const useImageStore = create<ImageState>((set, get) => ({
  main: null,
  tiles: [],
  urls: new Map(),

  batchType: 'histogram',
  opacity: 0.5,
  scale: 1.0,
  maxCount: 5000,

  tileCounter: new Map(),

  setUrl: (fileName: string, url: string) => {
    const urls = new Map(get().urls);
    set({ urls: urls.set(fileName, url) });
  },
  deleteUrl: (fileName: string) => {
    const urls = new Map(get().urls);
    urls.delete(fileName);

    set({ urls });
  },
  setMain: (file: File) => set({ main: file }),
  deleteMain: () => set({ main: null }),
  appendTile: (...tiles: File[]) => set({ tiles: [...get().tiles, ...tiles] }),
  setTiles: (tiles: File[]) => set({ tiles }),
  setBatchType: (batchType: 'histogram' | 'random') => set({ batchType }),
  setOpacity: (opacity: number) => set({ opacity }),
  setScale: (scale: number) => set({ scale }),
  setMaxCount: (maxCount: number) => set({ maxCount }),
  setTileCount: (fileName: string, tileCount: TileCounter) => {
    const tileCounter = new Map(get().tileCounter);
    set({
      tileCounter: tileCounter.set(fileName, tileCount),
    });
  },
  incrementCount: (fileName: string) => {
    const tileCounter = new Map(get().tileCounter);
    const tileCount = tileCounter.get(fileName);
    if (!tileCount) {
      return;
    }

    set({
      tileCounter: tileCounter.set(fileName, {
        count: tileCount.count + 1,
        url: tileCount.url,
      }),
    });
  },

  hasCount: (fileName: string) => get().tileCounter.get(fileName) !== undefined,

  reset: () =>
    set({
      main: null,
      tiles: [],
      urls: new Map(),
      batchType: 'histogram',
      opacity: 0.5,
      scale: 1,
      maxCount: 5000,
      tileCounter: new Map(),
    }),
}));

export default useImageStore;
