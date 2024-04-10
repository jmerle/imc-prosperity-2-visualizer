import { Table } from '@mantine/core';
import { ReactNode } from 'react';
import { TradingState } from '../../models.ts';
import { formatNumber } from '../../utils/format.ts';
import { SimpleTable } from './SimpleTable.tsx';

export interface PlainValueObservationsTableProps {
  plainValueObservations: TradingState['observations']['plainValueObservations'];
}

export function PlainValueObservationsTable({ plainValueObservations }: PlainValueObservationsTableProps): ReactNode {
  const rows: ReactNode[] = [];
  for (const product of Object.keys(plainValueObservations)) {
    rows.push(
      <Table.Tr key={product}>
        <Table.Td>{product}</Table.Td>
        <Table.Td>{formatNumber(plainValueObservations[product])}</Table.Td>
      </Table.Tr>,
    );
  }

  return <SimpleTable label="plain value observations" columns={['Product', 'Value']} rows={rows} />;
}
