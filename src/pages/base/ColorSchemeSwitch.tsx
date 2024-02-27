import { Box, Center, SegmentedControl } from '@mantine/core';
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useColorSchemeState } from '../../hooks/use-color-scheme-state.ts';

export function ColorSchemeSwitch(): ReactNode {
  const [colorScheme, setColorScheme] = useColorSchemeState();

  return (
    <SegmentedControl
      m="md"
      value={colorScheme}
      onChange={setColorScheme as (value: string) => void}
      data={[
        {
          label: (
            <Center>
              <IconSun size={16} />
              <Box ml="xs">Light</Box>
            </Center>
          ),
          value: 'light',
        },
        {
          label: (
            <Center>
              <IconMoon size={16} />
              <Box ml="xs">Dark</Box>
            </Center>
          ),
          value: 'dark',
        },
        {
          label: (
            <Center>
              <IconDeviceDesktop size={16} />
              <Box ml="xs">System</Box>
            </Center>
          ),
          value: 'auto',
        },
      ]}
    />
  );
}
