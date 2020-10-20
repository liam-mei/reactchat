import { useEffect, useRef } from "react";

export const useThrottle = (effect, delay, deps) => {
  const isThrottledRef = useRef(false);

  useEffect(() => {
    if (!deps.length) return;
    const callbackHandler = setTimeout(() => {
      if (isThrottledRef.current === false) {
        effect();
        console.log("throttle");
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
    }, delay + 100);
  }, [delay, deps]);
};
/*
In react, whenever state/props change the component is rerendered.
as such, there is a disconnect from react api to setTimeout api which is bound to the window

for useThrottle, you need to run the function at most once every set amount of time.

1. For simple throttling, you need to useRef to store a variable across renders
2. Check if it's throttled
    1. if not throttled, run the effect/callback, flip the throttled useRef
    2. if throttled, just return

With only simple throttling, you'll run into an issue that a rerender
  will happen after it was not throttled
  In that cast, the last rerender won't run bc at the time, it was throttled

To solve that, you need to run a setTimeout each time the hook runs
and clear the timeout during the cleanup so you only have 1 timeout at a time

*/

// const isThrottledRef = useRef(false);
//   useEffect(() => {
//     const callbackHandler = setTimeout(() => {
//       if (isThrottledRef.current === false) {
//         socket.emit("searchRooms", room);
//         console.log("throttle");
//       }
//     }, 1000);

//     if (isThrottledRef.current)
//     return () => {
//       clearTimeout(callbackHandler);
//     };

//     // callback
//     socket.emit("searchRooms", room);
//     isThrottledRef.current = true;
//     setTimeout(() => {
//       isThrottledRef.current = false;
//     }, 1100);
//   }, [room, socket]);
