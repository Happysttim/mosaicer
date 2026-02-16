import Stepper from '@/components/ui/stepper';
import { CONST_URL } from '@/constants/url';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  nowStep: number;
};

const Header = ({ nowStep }: HeaderProps) => {
  const navigate = useNavigate();
  const steps = ['메인 이미지 선택', '타일 이미지 선택', '세부 설정'];

  return (
    <div className="border-default h-44 w-screen border-b-2 md:h-55">
      <div className="mx-4 mt-4 md:mx-8 md:mt-8">
        <span
          className="font-mosaic text-[24px] hover:cursor-pointer md:text-[32px]"
          onClick={() => navigate(CONST_URL.HOME)}
        >
          Mosaicer
        </span>
      </div>
      <div className="mt-19.25 mb-7 flex items-center justify-center">
        <Stepper steps={steps} nowStep={nowStep} />
      </div>
    </div>
  );
};

export default Header;
