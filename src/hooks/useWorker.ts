import useImageStore from '@/stores/image';
import type { ImageStore, PostMessage } from '@/types/worker';
import { useCallback, useEffect, useRef, useState } from 'react';

type ResultType = {
  result: ImageData | undefined;
  percentage: number;
  message: string;
  terminate: () => void;
  postMessage: (message: ImageStore) => void;
};

type WorkerProps = {
  worker: Worker;
};

const useWorker = ({ worker }: WorkerProps): ResultType => {
  const [result, setResult] = useState<ImageData>();
  const [percentage, setPercentage] = useState(0);
  const [message, setMessage] = useState('');
  const workerRef = useRef<Worker>(null);

  const { main, tiles, batchType, opacity, scale, maxCount } =
    useImageStore.getState();

  useEffect(() => {
    workerRef.current = worker;
    workerRef.current.onmessage = (e: MessageEvent<PostMessage>) => {
      const { percentage, result, message } = e.data;
      if (percentage != null) {
        setPercentage(percentage);
      }

      if (result) {
        setResult(result);
      }

      setMessage(message);
      return () => {
        if (workerRef.current) workerRef.current.terminate();
      };
    };
  }, [worker]);

  const postMessage = useCallback(() => {
    if (!workerRef.current) return;

    workerRef.current.postMessage({
      main,
      tiles,
      batchType,
      opacity,
      scale,
      maxCount,
    });
  }, [batchType, main, maxCount, opacity, scale, tiles]);

  const terminate = useCallback(() => {
    if (!workerRef.current) return;
    workerRef.current.terminate();
  }, []);

  return {
    result,
    percentage,
    message,
    terminate,
    postMessage,
  };
};

export default useWorker;
