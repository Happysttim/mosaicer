import Next from '@/assets/next.svg?react';
import Prev from '@/assets/prev.svg?react';
import { cn } from '@/lib/utils';
import { type ClassValue } from 'clsx';

type ArrowProps = {
  direction: 'right' | 'left';
  className: ClassValue;
  onClick?: () => void;
};

const Arrow = ({ direction, className, onClick }: ArrowProps) => {
  return (
    <div
      className={cn(
        'flex h-4 w-4 items-center justify-center rounded-[100px] bg-transparent md:h-20 md:w-20',
        className,
      )}
    >
      <span
        className="text-disabled hover:text-primary hover:cursor-pointer"
        onClick={onClick}
      >
        {direction === 'right' ? <Next width="16" /> : <Prev width="16" />}
      </span>
    </div>
  );
};

export default Arrow;
