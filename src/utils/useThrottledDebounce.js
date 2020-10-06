// import React, { useCallback, useEffect, useRef, useState } from "react";

// const throttleImpl = (cb, delay) => {
//   let isThrottled = false;
//   return (...args) => {
//     if (isThrottled) return;
//     isThrottled = true;
//     cb(...args);
//     setTimeout(() => {
//       isThrottled = false;
//     }, delay);
//   };
// };

// function useThrottle(cb, delay) {
//   const cbRef = useRef(cb);
//   useEffect(() => {
//     cbRef.current = cb;
//   });
//   return useCallback(
//     throttleImpl((...args) => cbRef.current(...args), delay),
//     [delay]
//   );
// }

// export default function useThrottledDebounce() {
//   const [value, setValue] = useState(0);
//   const invokeThrottled = useThrottle(
//     () => console.log("throttled", value),
//     1000
//   );

//   useEffect(invokeThrottled, [value]);
//   return <button onClick={() => setValue(value + 1)}>{value}</button>;
// }

// function useThrottle2(cb, delay) {
//   const cbRef = useRef(cb);
//   useEffect(() => {
//     cbRef.current = cb;
//   });

//   let isThrottled = false;
//   return useCallback(() => {
//     if (isThrottled) return;
//     isThrottled = true;
//     cbRef.current();
//     setTimeout(() => {
//       isThrottled = false;
//     }, delay);
//   }, [delay]);
// }

// function useThrottle3(cb) {
//   const cbRef = useRef(cb);
//   useEffect(() => {
//     cbRef.current = cb;
//   });

//   let isThrottled = false;
//   return useCallback(() => {
//     if (isThrottled) return;
//     isThrottled = true;
//     cbRef.current();
//     setTimeout(() => {
//       isThrottled = false;
//     }, 1000);
//   }, []);
// }

// function useThrottleDoesNotWork(effect, delay, deps) {
//   const callback = useCallback(effect, deps);
//   let isThrottledRef = useRef();
//   isThrottledRef.current = false;

//   useEffect(() => {
//     if (isThrottledRef.current) return;
//     isThrottledRef.current = true;
//     callback();
//     setTimeout(() => {
//       isThrottledRef.current = false;
//     }, delay);
//   }, [callback, delay]);
// }

// function useThrottleHookDNW(fun, timeout, changes = []) {
//   // Create the ref to store timer.
//   const timer = useRef(null);

//   function cancel() {
//     if (timer.current) {
//       clearTimeout(timer.current);
//       timer.current = null;
//     }
//   }

//   // Register the
//   useEffect(() => cancel, changes);

//   return function () {
//     cancel();

//     timer.current = setTimeout(() => {
//       timer.current = true;
//       fun();
//     }, timeout);
//   };
// }