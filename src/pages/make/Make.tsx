import { useState } from 'react';
import Header from './components/Header';
import FirstStep from './steps/FirstStep';
import SecondStep from './steps/SecondStep';
import ThirdStep from './steps/ThirdStep';
import Arrow from './components/Arrow';
import { cn } from '@/lib/utils';

const Make = () => {
  const [nowStep, setNowStep] = useState(0);
  const [dir, setDir] = useState<'left' | 'right'>('right');

  const StepPage = (step: number) => {
    if (step === 0) return <FirstStep />;
    if (step === 1) return <SecondStep />;
    return <ThirdStep />;
  };

  const handlePrev = () => {
    setDir('left');
    setNowStep((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setDir('right');
    setNowStep((prev) => Math.min(2, prev + 1));
  };

  return (
    <div className="min-h-screen w-screen">
      <Header nowStep={nowStep} />
      <div className="flex h-full min-h-0 w-full flex-1 items-center justify-center">
        {nowStep > 0 && (
          <Arrow
            direction="left"
            onClick={handlePrev}
            className="absolute top-1/2 left-2 z-9999 -translate-y-1/2 transform"
          />
        )}
        <SlideDiv dir={dir} step={nowStep}>
          {StepPage(nowStep)}
        </SlideDiv>
        {nowStep < 2 && (
          <Arrow
            direction="right"
            onClick={handleNext}
            className="absolute top-1/2 right-2 z-9999 -translate-y-1/2 transform"
          />
        )}
      </div>
    </div>
  );
};

type SlideDivProps = {
  dir: 'left' | 'right';
  step: number;
  children: React.ReactNode;
};

const SlideDiv = ({ dir, step, children }: SlideDivProps) => {
  return (
    <div className="my-10 flex h-full min-h-0 w-full flex-1 items-center justify-center">
      <div
        key={`${step}-${dir}`}
        className={cn(
          'inset-0 flex min-h-0 flex-1 items-center justify-center',
          'animate-in duration-200',
          dir === 'right' ? 'slide-in-from-right-40' : 'slide-in-from-left-40',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Make;
