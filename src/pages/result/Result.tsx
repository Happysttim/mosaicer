import Button from '@/components/ui/button';
import Progress from '@/components/ui/progress';
import { CONST_URL } from '@/constants/url';
import useWorker from '@/hooks/useWorker';
import useImageStore from '@/stores/image';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Download from '@/assets/download.svg?react';

import WorkMosaicer from '@/workers/mosaicer?worker';

const Result = () => {
  const worker = useMemo(() => new WorkMosaicer(), []);
  const { message, percentage, result, terminate, postMessage } = useWorker({
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
    <div className="from-secondary to-clean h-screen w-screen overflow-hidden bg-linear-to-b">
      <div className="border-default h-17 w-screen md:h-55">
        <div className="mx-4 mt-4 md:mx-8 md:mt-8">
          <span
            className="font-mosaic text-[24px] hover:cursor-pointer md:text-[32px]"
            onClick={() => navigate(CONST_URL.HOME)}
          >
            Mosaicer
          </span>
        </div>
      </div>
      {result ? (
        <ShowImage result={result} terminate={terminate} />
      ) : (
        <Processing percentage={percentage} message={message} />
      )}
    </div>
  );
};

type ProcessingProps = {
  percentage: number;
  message: string;
};

const Processing = ({ percentage, message }: ProcessingProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-150 w-full items-center justify-center">
      <div className="flex flex-1 flex-col items-center justify-center space-y-11">
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-1.25">
          <p className="font-mosaic text-[56px]">Processing...</p>
          <p className="font-sans text-[32px]">{message}</p>
          <Progress value={percentage} max={100} />
        </div>
        <Button
          content="취소하기"
          status="danger"
          size="md"
          variant="default"
          onClick={() => navigate(CONST_URL.HOME)}
        />
      </div>
    </div>
  );
};

type ShowImageProps = {
  result: ImageData;
  terminate: () => void;
};

async function downloadImageDataFast(imageData: ImageData, fileName: string) {
  const canvas = new OffscreenCanvas(imageData.width, imageData.height);
  const ctx = canvas.getContext('2d')!;
  ctx.putImageData(imageData, 0, 0);

  const blob = await canvas.convertToBlob({ type: 'image/png' });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

const ShowImage = ({ result, terminate }: ShowImageProps) => {
  const navigate = useNavigate();
  const main = useImageStore((state) => state.main);
  const [src, setSrc] = useState('');

  useEffect(() => {
    terminate();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = result.width;
    canvas.height = result.height;

    ctx?.putImageData(result, 0, 0);

    setSrc(canvas.toDataURL());
  }, [result]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex h-200 w-full flex-col items-center gap-4">
        <div className="bg-300 border-strong flex h-75 w-75 items-center justify-center md:h-150 md:w-275">
          {src ? (
            <img src={src} className="h-full w-full object-cover" />
          ) : (
            <span className="font-sans text-[18px] md:text-[56px]">
              이미지를 불러오는 중입니다...
            </span>
          )}
        </div>
        <div className="flex w-full items-center justify-center gap-5">
          <Button
            content="이미지 다운로드"
            status="success"
            icon={Download}
            size="md"
            variant="default"
            onClick={() => downloadImageDataFast(result, main!.name)}
          />
          <Button
            content="메인으로"
            size="md"
            variant="ghost"
            status="primary"
            onClick={() => navigate(CONST_URL.HOME)}
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
