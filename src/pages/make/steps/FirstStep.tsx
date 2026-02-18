import useImageStore from '@/stores/image';
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from 'react';

const FirstStep = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const setMain = useImageStore((state) => state.setMain);
  const main = useImageStore((state) => state.main);

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!main) return;
    const url = URL.createObjectURL(main);
    setImageUrl(url);
  }, [main]);

  const handleClick = () => {
    if (!fileRef.current) return;
    fileRef.current.click();
  };

  const handleDrop = (e: DragEvent) => {
    const files = e.dataTransfer.files;

    if (!files) return;
    e.preventDefault();
    setMain(files[0]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!fileRef.current) return;
    const files = e.currentTarget.files;
    if (!files) return;

    setMain(files[0]);
    fileRef.current.value = '';
  };

  return (
    <div
      className="bg-weak border-strong flex h-75 w-75 items-center justify-center rounded-md border-2 border-dashed hover:cursor-pointer md:h-150 md:w-275"
      onClick={handleClick}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
      {main && imageUrl ? (
        <img src={imageUrl} className="h-full w-full rounded-md object-cover" />
      ) : (
        <span className="font-sans text-[18px] md:text-[48px]">
          여기를 눌러 이미지 파일을 올려주세요
        </span>
      )}
    </div>
  );
};

export default FirstStep;
