import Button from '@/components/ui/button';
import { URL } from '@/constants/url';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate(URL.MAKE);

  return (
    <div className="from-secondary to-clean flex h-screen w-screen items-center justify-center bg-linear-to-b">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-2">
          <p className="text-weak cursor-default font-sans text-[24px] md:text-[56px]">
            당신의 추억을 한 장의 사진에 담아보세요
          </p>
          <p className="font-mosaic text-primary cursor-default text-center text-[56px]">
            Mosaicer
          </p>
        </div>
        <Button
          variant="default"
          status="primary"
          content="지금 시작해보기"
          size="lg"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Home;
