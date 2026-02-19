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
    <div className="border-default z-9999 h-30 w-screen border-b-2 bg-white md:h-44 lg:h-55">
      <div className="pt-4 pl-4 md:pt-8 md:pl-8">
        <span
          className="font-mosaic text-primary text-[24px] tracking-wide drop-shadow-sm hover:cursor-pointer md:text-[32px]"
          onClick={() => navigate(CONST_URL.HOME)}
        >
          Mosaicer
        </span>
      </div>
      <div className="mt-5 flex items-center justify-center lg:mt-19">
        <Stepper steps={steps} nowStep={nowStep} />
      </div>
    </div>
  );
};

export default Header;
