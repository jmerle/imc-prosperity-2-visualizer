import { useMantineColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

export function useActualColorScheme(): 'light' | 'dark' {
  const mantineColorScheme = useMantineColorScheme();
  const systemColorScheme = useColorScheme();

  return mantineColorScheme.colorScheme === 'auto' ? systemColorScheme : mantineColorScheme.colorScheme;
}
