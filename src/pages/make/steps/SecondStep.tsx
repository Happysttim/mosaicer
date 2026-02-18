import Button from '@/components/ui/button';
import {
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
} from 'react';
import Plus from '@/assets/plus.svg?react';
import Minus from '@/assets/minus.svg?react';
import useImageStore from '@/stores/image';
import { cn } from '@/lib/utils';
import useMediaWidth from '@/hooks/useWidth';

const SecondStep = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectUrls, setSelectUrls] = useState<number[]>([]);

  const urls = useImageStore((state) => state.urls);
  const setUrls = useImageStore((state) => state.setUrls);
  const appendTile = useImageStore((state) => state.appendTile);
  const setTiles = useImageStore((state) => state.setTiles);
  const tiles = useImageStore((state) => state.tiles);

  const match = useMediaWidth({ minWidth: 768 });

  const handleClick = () => {
    if (!fileRef.current) {
      return;
    }
    fileRef.current.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || !fileRef.current) return;
    const fileArr = Array.from(files);
    files2Urls(fileArr);
    appendTile(...fileArr);

    fileRef.current.value = '';
  };

  const handleDrop = (e: DragEvent) => {
    const files = e.dataTransfer.files;
    if (!files) return;

    e.preventDefault();

    const fileArr = Array.from(files);
    files2Urls(fileArr);
    appendTile(...fileArr);
  };

  const handleImgClick = (e: MouseEvent, idx: number) => {
    e.stopPropagation();
    setSelectUrls((prev) =>
      prev.includes(idx) ? prev.filter((v) => v != idx) : [...prev, idx],
    );
  };

  const handleRemoveClick = () => {
    const newUrls = urls.filter((_, i) => !selectUrls.includes(i));
    const newTiles = tiles.filter((_, i) => !selectUrls.includes(i));

    setUrls(newUrls);
    setTiles(newTiles);
    setSelectUrls([]);
  };

  const files2Urls = (files: File[]) => {
    const appendUrls = files.map((file) => URL.createObjectURL(file));
    setUrls([...urls, ...appendUrls]);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div
        className={cn(
          'bg-weak border-strong flex h-80 w-75 rounded-md border-2 border-dashed p-2 hover:cursor-pointer md:h-75 md:w-145 xl:h-125 xl:w-271',
          urls.length === 0
            ? 'items-center justify-center'
            : 'flex-wrap content-start justify-start gap-0 overflow-auto',
        )}
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleChange}
        />
        {urls.length > 0 ? (
          urls.map((url, idx) => (
            <img
              key={url}
              src={url}
              className={cn(
                'h-14 w-14 object-cover',
                selectUrls.includes(idx) && 'border-danger border-2',
              )}
              onClick={(e: MouseEvent) => handleImgClick(e, idx)}
            />
          ))
        ) : (
          <span className="font-sans text-[18px] md:text-[32px] xl:text-[56px]">
            업로드 된 타일은 여기에 보입니다
          </span>
        )}
      </div>
      <div className="flex gap-5">
        <Button
          variant="default"
          status="primary"
          size={match ? 'md' : 'sm'}
          content="타일 업로드"
          icon={Plus}
          onClick={handleClick}
        />
        <Button
          variant="default"
          status={selectUrls.length > 0 ? 'danger' : 'disabled'}
          size={match ? 'md' : 'sm'}
          content="선택된 타일 삭제"
          icon={Minus}
          onClick={handleRemoveClick}
        />
      </div>
    </div>
  );
};

export default SecondStep;
