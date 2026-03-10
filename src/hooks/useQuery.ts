import { useEffect, useMemo, useState } from 'react';

import { LOADING_TIMER_MS } from '../constants';
import type { IconObjectArray, IconPickerOptions } from '../types';
import { getIcons } from '../utils/icons';
import type { Dispatch, SetStateAction } from 'react';

interface UseQueryProps {
  (options: IconPickerOptions): UseQueryResult;
}

interface UseQueryResult {
  query: string;
  loading: boolean;
  results: IconObjectArray;
  setQuery: Dispatch<SetStateAction<string>>;
}

export const useQuery: UseQueryProps = (options) => {
  const [query, setQuery] = useState('');
  const icons = useMemo(() => getIcons(options), [options]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => setDebouncedQuery(query),
      LOADING_TIMER_MS,
    );

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  const results = useMemo<IconObjectArray>(() => {
    return icons.filter(({ name }) =>
      name.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [debouncedQuery, icons]);

  const loading = query !== debouncedQuery;

  return {
    query,
    loading,
    results,
    setQuery,
  };
};
