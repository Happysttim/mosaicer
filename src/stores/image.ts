import { create } from 'zustand';

interface ImageState {
  main: File | null;
  tiles: File[];
  urls: string[];

  batchType: 'histogram' | 'random';
  opacity: number;
  scale: number;
  maxCount: number;

  setUrls: (urls: string[]) => void;
  setMain: (file: File) => void;
  deleteMain: () => void;
  appendTile: (...tiles: File[]) => void;
  setTiles: (tiles: File[]) => void;
  setBatchType: (batchType: 'histogram' | 'random') => void;
  setOpacity: (opaticy: number) => void;
  setScale: (scale: number) => void;
  setMaxCount: (maxCount: number) => void;

  reset: () => void;
}

const useImageStore = create<ImageState>((set, get) => ({
  main: null,
  tiles: [],
  urls: [],

  batchType: 'histogram',
  opacity: 0.5,
  scale: 1.0,
  maxCount: 5000,

  setUrls: (urls: string[]) => set({ urls }),
  setMain: (file: File) => set({ main: file }),
  deleteMain: () => set({ main: null }),
  appendTile: (...tiles: File[]) => set({ tiles: [...get().tiles, ...tiles] }),
  setTiles: (tiles: File[]) => set({ tiles }),
  setBatchType: (batchType: 'histogram' | 'random') => set({ batchType }),
  setOpacity: (opacity: number) => set({ opacity }),
  setScale: (scale: number) => set({ scale }),
  setMaxCount: (maxCount: number) => set({ maxCount }),

  reset: () =>
    set({
      main: null,
      tiles: [],
      urls: [],
      batchType: 'histogram',
      opacity: 0.5,
      scale: 1,
      maxCount: 5000,
    }),
}));

export default useImageStore;
