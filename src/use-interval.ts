import { useEffect, useRef, useState } from 'react';

export const useInterval = (fn, ms, deps?) => {
  const intervalRef = useRef<any>();
  const [on, setOn] = useState(false);

  const effect = () => {
    fn();

    intervalRef.current = setTimeout(effect, ms);
  };
  useEffect(() => {
    if (on) {
      effect();
    }

    return () => clearTimeout(intervalRef.current as any);
  }, [deps, on]);

  return {
    start: () => setOn(true),
    stop: () => setOn(false),
  };
};
