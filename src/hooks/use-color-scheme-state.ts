import { MantineColorScheme, useMantineColorScheme } from '@mantine/core';
import { useCallback } from 'react';
import { useStore } from '../store.ts';

export function useColorSchemeState(): [MantineColorScheme, (colorScheme: MantineColorScheme) => void] {
  const storedColorScheme = useStore(state => state.colorScheme);
  const setStoredColorScheme = useStore(state => state.setColorScheme);
  const mantineColorScheme = useMantineColorScheme();

  const setColorScheme = useCallback(
    (value: string) => {
      setStoredColorScheme(value as MantineColorScheme);
      mantineColorScheme.setColorScheme(value as MantineColorScheme);
    },
    [setStoredColorScheme, mantineColorScheme],
  );

  return [storedColorScheme, setColorScheme];
}
