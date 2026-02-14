import Button from '@/components/ui/button';
import { useRef } from 'react';
import Plus from '@/assets/plus.svg?react';
import Minus from '@/assets/minus.svg?react';

const SecondStep = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!fileRef.current) {
      return;
    }
    fileRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div
        className="bg-300 border-strong flex h-105 w-75 items-center justify-center rounded-md border-2 border-dashed hover:cursor-pointer md:h-125 md:w-275"
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          multiple
        />
        <span className="font-sans text-[20px] md:text-[56px]">
          업로드 된 타일은 여기에 보입니다
        </span>
      </div>
      <div className="flex gap-5">
        <Button
          variant="default"
          status="primary"
          size="md"
          content="타일 업로드"
          icon={Plus}
          onClick={handleClick}
        />
        <Button
          variant="default"
          status="danger"
          size="md"
          content="선택된 타일 삭제"
          icon={Minus}
        />
      </div>
    </div>
  );
};

export default SecondStep;
