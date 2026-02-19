import useImageStore from '@/stores/image';
import type { Logs } from '@/types/logger';
import type { ImageStore, PostMessage } from '@/types/worker';
import { useCallback, useEffect, useRef, useState } from 'react';

type ResultType = {
  result: ImageData | undefined;
  percentage: number;
  message: string;
  logs: Logs;
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
  const [logs, setLogs] = useState<Logs>([]);
  const workerRef = useRef<Worker>(null);

  const {
    main,
    tiles,
    batchType,
    opacity,
    scale,
    maxCount,
    urls,
    setTileCount,
    incrementCount,
  } = useImageStore.getState();

  useEffect(() => {
    workerRef.current = worker;
    workerRef.current.onmessage = (e: MessageEvent<PostMessage>) => {
      const data = e.data;
      if (data.type === 'process') {
        setPercentage(data.percentage);
        setMessage(data.message);
        if (data.result) {
          setResult(data.result);
        }
      } else if (data.type === 'log') {
        setLogs((prev) => [...prev, data.logMessage]);
      } else {
        if (data.state === 'set') {
          const url = urls.get(data.fileName);
          if (url) {
            setTileCount(data.fileName, { url, count: 0 });
          }
        } else {
          incrementCount(data.fileName);
        }
      }

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
    logs,
    terminate,
    postMessage,
  };
};

export default useWorker;
