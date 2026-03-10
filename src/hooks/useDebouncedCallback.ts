import { useRef } from 'react';

export default function useDebouncedCallback<A extends unknown[]>(
  callback: (...args: A) => void,
  delay: number,
): (...args: A) => void {
  const timeoutIdRef = useRef<number | null>(null);

  return (...args: A) => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = window.setTimeout(() => callback(...args), delay);
  };
}
