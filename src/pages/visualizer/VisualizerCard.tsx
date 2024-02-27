import { Paper, PaperProps, Title } from '@mantine/core';
import { ReactNode } from 'react';

interface VisualizerCardProps extends PaperProps {
  title?: string;
  children?: ReactNode;
}

export function VisualizerCard({ title, children, ...paperProps }: VisualizerCardProps): ReactNode {
  return (
    <Paper withBorder shadow="xs" p={'md'} {...paperProps}>
      {title && (
        <Title order={4} mb="xs">
          {title}
        </Title>
      )}

      {children}
    </Paper>
  );
}
