import { CONST_URL } from '@/constants/url';
import useWorker from '@/hooks/useWorker';
import useImageStore from '@/stores/image';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkMosaicer from '@/workers/mosaicer?worker';
import Processing from './Processing';
import ShowImage from './ShowImage';

const Result = () => {
  const worker = useMemo(() => new WorkMosaicer(), []);
  const { message, percentage, result, logs, terminate, postMessage } =
    useWorker({
      worker,
    });
  const navigate = useNavigate();

  const main = useImageStore((state) => state.main);
  const tiles = useImageStore((state) => state.tiles);
  const batchType = useImageStore((state) => state.batchType);
  const opacity = useImageStore((state) => state.opacity);
  const scale = useImageStore((state) => state.scale);
  const maxCount = useImageStore((state) => state.maxCount);

  useEffect(() => {
    postMessage({
      main,
      tiles,
      batchType,
      opacity,
      scale,
      maxCount,
    });
  }, []);

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className="border-default h-17 w-screen md:h-35">
        <div className="pt-4 pl-4 md:pt-8 md:pl-8">
          <span
            className="font-mosaic text-primary text-[24px] tracking-wide drop-shadow-sm hover:cursor-pointer md:text-[32px]"
            onClick={() => navigate(CONST_URL.HOME)}
          >
            Mosaicer
          </span>
        </div>
      </div>
      {result ? (
        <ShowImage result={result} terminate={terminate} />
      ) : (
        <Processing percentage={percentage} message={message} logs={logs} />
      )}
    </div>
  );
};

export default Result;
