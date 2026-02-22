import Button from '@/components/ui/button';
import { CONST_URL } from '@/constants/url';
import { renderToString } from 'react-dom/server';

const Home = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center from-white via-neutral-50 to-neutral-100">
      <section className="flex w-full flex-1 flex-col items-center justify-center px-6 py-20">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col gap-3">
            <p className="text-strong font-sans text-[28px] leading-tight font-bold md:text-[48px] lg:text-[56px]">
              당신의 추억을 한 장의 사진에 담아보세요
            </p>
            <p className="font-mosaic text-primary text-[64px] tracking-wide drop-shadow-sm md:text-[96px] lg:text-[120px]">
              Mosaicer
            </p>
          </div>
          <a href={CONST_URL.MAKE}>
            <Button
              variant="default"
              status="primary"
              content="지금 시작해보기"
              size="lg"
            />
          </a>
        </div>
      </section>
      <div className="w-full max-w-5xl px-6">
        <div className="my-10 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent" />
      </div>
      <section className="w-full max-w-6xl px-6 pb-24">
        <div className="mb-14 flex flex-col items-center gap-6 text-center">
          <p className="text-strong font-sans text-[18px] font-semibold md:text-[32px]">
            <span className="font-mosaic text-primary">mosaicer</span>는
            이미지를 서버에 저장하지 않습니다.
          </p>
          <p className="text-sm text-neutral-500 md:text-base">
            모든 처리는 브라우저에서만 진행됩니다
          </p>
        </div>
        <div className="grid gap-14 md:gap-20">
          <div className="flex flex-col items-center gap-5">
            <p className="text-strong text-lg font-semibold md:text-xl">
              가공할 메인 사진을 선택하세요
            </p>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
              <img
                src="/usage/step-one.png"
                className="w-[320px] object-cover md:w-130 lg:w-160"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <p className="text-strong text-lg font-semibold md:text-xl">
              메인 사진을 특별하게 보일 타일 이미지를 선택하세요
            </p>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
              <img
                src="/usage/step-two.png"
                className="w-[320px] object-cover md:w-130 lg:w-160"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <p className="text-strong text-lg font-semibold md:text-xl">
              세부 설정을 입력하세요
            </p>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
              <img
                src="/usage/step-three.png"
                className="w-[320px] object-cover md:w-130 lg:w-160"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <p className="text-strong text-lg font-semibold md:text-xl">
              이미지가 많으면 시간이 오래 걸릴수도 있습니다.
            </p>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
              <img
                src="/usage/step-four.png"
                className="w-[320px] object-cover md:w-130 lg:w-160"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <p className="text-strong text-lg font-semibold md:text-xl">
              마지막으로 가공된 이미지를 저장해보세요
            </p>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg">
              <img
                src="/usage/result.png"
                className="w-[320px] object-cover md:w-130 lg:w-160"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const prerender = () => {
  const html = renderToString(<Home />);
  return { html };
};

export default Home;
