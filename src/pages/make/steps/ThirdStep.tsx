import Button from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import TextField from '@/components/ui/textfield';
import { CONST_URL } from '@/constants/url';
import useMediaWidth from '@/hooks/useWidth';
import useImageStore from '@/stores/image';
import { useNavigate } from 'react-router-dom';

const ThirdStep = () => {
  const navigate = useNavigate();
  const match = useMediaWidth({ minWidth: 768 });

  const batchType = useImageStore((state) => state.batchType);
  const setBatchType = useImageStore((state) => state.setBatchType);

  const opacity = useImageStore((state) => state.opacity);
  const setOpacity = useImageStore((state) => state.setOpacity);

  const scale = useImageStore((state) => state.scale);
  const setScale = useImageStore((state) => state.setScale);

  const maxCount = useImageStore((state) => state.maxCount);
  const setMaxCount = useImageStore((state) => state.setMaxCount);

  return (
    <div className="flex items-center justify-center">
      <Card>
        <CardContent className="flex flex-col gap-2">
          <div className="relative">
            <p className="text-[18px] md:text-[24px]">투명도</p>
            <TextField
              type="number"
              value={opacity}
              step="0.1"
              min="0.1"
              max="1.0"
              status="primary"
              width={100}
              helpMessage="타일의 투명도를 조절합니다."
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
            />
          </div>
          <div className="relative">
            <p className="text-[18px] md:text-[24px]">배치 타입</p>
            <RadioGroup
              value={batchType}
              className="w-fit"
              onValueChange={(e) => setBatchType(e as 'histogram' | 'random')}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="histogram" id="histogram" />
                <Label
                  htmlFor="histogram"
                  className="text-[12px] md:text-[18px]"
                >
                  히스토그램
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="random" id="random" />
                <Label htmlFor="random" className="text-[12px] md:text-[18px]">
                  랜덤
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="relative">
            <p className="text-[18px] md:text-[24px]">스케일</p>
            <Slider
              onValueChange={(e) => setScale(e[0])}
              value={[scale]}
              max={5}
              min={1}
              step={0.1}
              className="my-4 w-40 md:w-full"
            />
            <TextField
              type="number"
              value={scale}
              max="5.0"
              min="1.0"
              step="0.1"
              status="primary"
              helpMessage="타일의 크기를 결정합니다."
              width={100}
              onChange={(e) => setScale(parseFloat(e.target.value))}
            />
          </div>
          <div className="relative">
            <p className="text-[18px] md:text-[24px]">최대 타일 개수</p>
            <Slider
              onValueChange={(e) => setMaxCount(e[0])}
              value={[maxCount]}
              max={10000}
              min={100}
              step={1}
              className="my-4 w-40 md:w-full"
            />
            <TextField
              type="number"
              value={maxCount}
              max="10000"
              min="100"
              step="1"
              status="primary"
              helpMessage="타일을 최대로 배치할 수 있는 갯수를 정합니다."
              width={100}
              onChange={(e) => setMaxCount(parseInt(e.target.value))}
            />
          </div>
          <div className="flex min-h-0 items-center justify-center gap-5">
            <Button
              variant="default"
              status={checkAllState() ? 'success' : 'disabled'}
              size={match ? 'md' : 'sm'}
              content="작업 시작하기"
              onClick={() => navigate(CONST_URL.RESULT)}
            />
            <Button
              variant="default"
              status="danger"
              size={match ? 'md' : 'sm'}
              content="작업 취소하기"
              onClick={() => navigate(CONST_URL.HOME)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const checkAllState = () => {
  const { main, tiles } = useImageStore.getState();
  return main !== null && tiles.length > 0;
};

export default ThirdStep;
