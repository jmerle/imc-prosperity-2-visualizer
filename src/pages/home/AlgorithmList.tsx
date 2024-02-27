import { Accordion, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { AlgorithmSummary } from '../../models.ts';
import { AlgorithmDetail } from './AlgorithmDetail.tsx';

export interface AlgorithmListProps {
  algorithms: AlgorithmSummary[];
}

export function AlgorithmList({ algorithms }: AlgorithmListProps): ReactNode {
  if (algorithms.length === 0) {
    return <Text mt="md">No algorithms found</Text>;
  }

  return (
    <Accordion variant="contained" defaultValue={algorithms[0].id} mt="md">
      {algorithms.map((algorithm, i) => (
        <AlgorithmDetail key={i} position={algorithms.length - i} algorithm={algorithm} />
      ))}
    </Accordion>
  );
}
