import { useCallback, useEffect, useRef } from "react";

export const useThrottle = (effect, delay, deps) => {
  const isThrottledRef = useRef(false);

  const callbackHolder = useCallback(effect, deps);

  useEffect(() => {
    const callbackHandler = setTimeout(() => {
      if (isThrottledRef.current === false) {
        callbackHolder();
      }
    }, delay);

    if (isThrottledRef.current)
      return () => {
        clearTimeout(callbackHandler);
      };

    // callback
    effect();
    isThrottledRef.current = true;
    setTimeout(() => {
      isThrottledRef.current = false;
    }, delay);
  }, [effect, delay, callbackHolder]);
};
/*
In react, whenever state/props change the component is rerendered.

for useThrottle, you need to run the function at most once every set amount of time.

1. use useRef hook to hold the isThrottled value
2. on every rerender, check if isThrottled
  a. if throttled, return;
  b. if not throttled,
     run callback, flip throttled flag to throttled, setTimeout to unThrottle
*/