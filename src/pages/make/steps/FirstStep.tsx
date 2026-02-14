import { useRef } from 'react';

const FirstStep = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!fileRef.current) {
      return;
    }
    fileRef.current.click();
  };

  return (
    <div
      className="bg-300 border-strong flex h-75 w-75 items-center justify-center rounded-md border-2 border-dashed hover:cursor-pointer md:h-150 md:w-275"
      onClick={handleClick}
    >
      <input type="file" ref={fileRef} className="hidden" accept="image/*" />
      <span className="font-sans text-[18px] md:text-[56px]">
        여기를 눌러 이미지 파일을 올려주세요
      </span>
    </div>
  );
};

export default FirstStep;
