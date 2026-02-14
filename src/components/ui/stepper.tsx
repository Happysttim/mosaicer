import { cn } from '@/lib/utils';

type DefaultStepperProps = {
  steps: string[];
  nowStep?: number;
};

const Stepper = ({ steps, nowStep = 0 }: DefaultStepperProps) => {
  return (
    <div className={cn('flex items-center justify-center gap-10')}>
      {steps.length > 0 &&
        steps.map((step, index) => {
          const bgColor = () => {
            if (index > nowStep) return 'bg-400';
            if (index === nowStep) return 'bg-primary';
            return 'bg-disabled';
          };

          const numberColor = () => {
            if (index > nowStep) return 'text-disabled';
            return 'text-weak';
          };

          const textColor = () => {
            if (index === nowStep) return 'text-primary';
            return 'text-disabled';
          };

          return (
            <div className="flex items-center justify-center gap-3 px-2.25">
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-4xl md:h-11 md:w-11',
                  bgColor(),
                )}
              >
                <span className={cn(numberColor())}>{index + 1}</span>
              </div>
              <span
                className={cn(
                  'font-sans text-[10px] md:text-[18px]',
                  textColor(),
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default Stepper;
