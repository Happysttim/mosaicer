import Button from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useMediaWidth from '@/hooks/useWidth';
import useImageStore from '@/stores/image';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Download from '@/assets/download.svg?react';
import { CONST_URL } from '@/constants/url';

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
  const tileCounter = useImageStore((state) => state.tileCounter);
  const [src, setSrc] = useState('');

  const match = useMediaWidth({ minWidth: 768 });

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
    <div className="flex flex-col items-center justify-center gap-3">
      <Card>
        <CardHeader>
          <CardTitle>이미지가 생성되었습니다!</CardTitle>
          <CardDescription>
            이미지 다운로드를 눌러 가공된 이미지를 다운로드 할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex h-75 w-75 items-center justify-center bg-transparent md:h-130 md:w-200">
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
              size={match ? 'md' : 'sm'}
              variant="default"
              onClick={() => downloadImageDataFast(result, main!.name)}
            />
            <Button
              content="메인으로"
              size={match ? 'md' : 'sm'}
              variant="ghost"
              status="primary"
              onClick={() => navigate(CONST_URL.HOME)}
            />
          </div>
        </CardContent>
      </Card>
      <div className="w-full max-w-5xl px-6">
        <div className="my-10 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent" />
      </div>
      <div className="mb-14 flex flex-col items-center gap-6 text-center">
        <p className="text-strong font-sans text-[18px] font-semibold md:text-[32px]">
          타일이 얼마나 사용되었는지 확인해보세요!
        </p>
        <p className="text-sm text-neutral-500 md:text-base">
          가장 많이 사용 된 타일 순으로 정렬되었습니다.
        </p>
      </div>
      <div className="border-strong mb-10 flex w-75 flex-wrap content-start justify-start gap-0 overflow-auto bg-transparent hover:cursor-pointer md:w-145 xl:w-271">
        {Array.from(tileCounter.entries())
          .sort(
            ([, tileCountA], [, tileCountB]) =>
              tileCountB.count - tileCountA.count,
          )
          .map(([fileName, tileCount]) => (
            <Popover key={fileName}>
              <PopoverTrigger asChild>
                <img
                  src={tileCount.url}
                  title={fileName}
                  alt={fileName}
                  className="h-15 w-15 object-cover"
                />
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-2 font-sans">
                  <img src={tileCount.url} className="w-100 object-cover" />
                  <p className="font-bold">{fileName}</p>
                  <p className="text-18px">
                    이 타일은 총 {tileCount.count}번 사용되었습니다.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          ))}
      </div>
    </div>
  );
};

export default ShowImage;
