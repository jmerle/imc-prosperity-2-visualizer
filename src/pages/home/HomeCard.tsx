import { Paper, Stack, Title } from '@mantine/core';
import { ReactNode } from 'react';

interface HomeCardProps {
  title: string;
  children: ReactNode;
}

export function HomeCard({ title, children }: HomeCardProps): ReactNode {
  return (
    <Paper withBorder shadow="xs" p="md">
      <Title order={3} mb="xs">
        {title}
      </Title>

      <Stack>{children}</Stack>
    </Paper>
  );
}
