import Button from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import TextField from '@/components/ui/textfield';
import { URL } from '@/constants/url';
import { useNavigate } from 'react-router-dom';

const ThirdStep = () => {
  const navigate = useNavigate();
  const handleCancel = () => navigate(URL.HOME);

  return (
    <div className="font-sans">
      <div className="flex w-40 flex-col items-center justify-center md:w-221">
        <div className="flex flex-col gap-10">
          <div className="relative">
            <p className="text-[32px]">투명도</p>
            <TextField
              type="number"
              defaultValue="0.1"
              status="primary"
              width={100}
            />
          </div>
          <div className="relative">
            <p className="text-[32px]">배치 타입</p>
            <RadioGroup defaultValue="histogram" className="w-fit">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="histogram" id="histogram" />
                <Label htmlFor="histogram">히스토그램</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="random" id="random" />
                <Label htmlFor="random">랜덤</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="relative">
            <p className="text-[32px]">타일 개수</p>
            <Slider
              defaultValue={[5000]}
              max={10000}
              min={1000}
              step={1}
              className="my-4"
            />
            <TextField
              type="number"
              defaultValue="5000"
              status="primary"
              width={70}
            />
          </div>
        </div>
      </div>
      <div className="my-10 flex w-full items-center justify-center gap-5">
        <Button
          variant="default"
          status="success"
          size="md"
          content="작업 시작하기"
        />
        <Button
          variant="default"
          status="danger"
          size="md"
          content="작업 취소하기"
          onClick={handleCancel}
        />
      </div>
    </div>
  );
};

export default ThirdStep;
