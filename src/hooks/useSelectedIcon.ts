import { useMemo } from 'react';

import type { IconObject, IconObjectArray } from '../types';

interface UseSelectedIconResult {
  selected: IconObject | null;
}

function getIconByValue(name: string, icons: IconObjectArray) {
  const found = icons.find((icon) => icon.name === name);
  return found || null;
}

export const useSelectedIcon = (
  iconName: string,
  results: IconObjectArray,
): UseSelectedIconResult => {
  const selected = useMemo(
    () => getIconByValue(iconName, results),
    [iconName, results],
  );

  return { selected };
};
