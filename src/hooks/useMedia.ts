import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useMedia(
  queries: string[],
  values: number[],
  defaultValue: number,
): number {
  const mediaQueryLists = useMemo(
    () => queries.map((query) => window.matchMedia(query)),
    [queries],
  );

  const getValue = useCallback(() => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    return typeof values[index] === 'undefined' ? defaultValue : values[index];
  }, [defaultValue, mediaQueryLists, values]);

  const [value, setValue] = useState<number>(() => getValue());

  useEffect(() => {
    const handler = () => setValue(getValue());

    mediaQueryLists.forEach((mql) => mql.addEventListener('change', handler));
    handler();

    return () => {
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener('change', handler),
      );
    };
  }, [getValue, mediaQueryLists]);

  return value;
}
