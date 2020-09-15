import { useEffect, useRef, useState } from 'react';

export const useInterval = (fn, ms, ...deps) => {
  const intervalRef = useRef<any>();
  const [on, setOn] = useState(false);

  const effect = () => {
    fn();

    intervalRef.current = setTimeout(effect, ms);
  };

  useEffect(() => {
    if (on) {
      intervalRef.current = setTimeout(effect, ms);
    } else {
      clearTimeout(intervalRef.current as any);
    }

    return () => clearTimeout(intervalRef.current as any);
  }, [deps, on, ms]);

  return {
    start: () => {
      effect();
      setOn(true);
    },
    stop: () => setOn(false),
  };
};
