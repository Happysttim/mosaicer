import { useEffect, useState } from 'react';

type UseWidthProps = {
  minWidth: number;
};

const useMediaWidth = ({ minWidth }: UseWidthProps) => {
  const matches = () => {
    return window.matchMedia(`screen and (min-width: ${minWidth}px)`).matches;
  };

  const [match, setMatch] = useState(matches);
  useEffect(() => {
    const handleMediaChange = (ev: MediaQueryListEvent) => setMatch(ev.matches);
    const media = window.matchMedia(`screen and (min-width: ${minWidth}px)`);
    media.addEventListener('change', handleMediaChange);
    setMatch(media.matches);
    return () => media.removeEventListener('change', handleMediaChange);
  }, [minWidth]);

  return match;
};

export default useMediaWidth;
