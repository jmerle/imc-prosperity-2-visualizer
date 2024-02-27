import { Box, Center } from '@mantine/core';
import { ReactNode, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ColorSchemeSwitch } from './ColorSchemeSwitch.tsx';
import { Header } from './Header.tsx';

export function BasePage(): ReactNode {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />

      <Outlet />

      <Box m="md">
        <Center>
          <ColorSchemeSwitch />
        </Center>
      </Box>
    </>
  );
}
