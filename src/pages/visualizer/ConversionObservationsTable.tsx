import { Table } from '@mantine/core';
import { ReactNode } from 'react';
import { TradingState } from '../../models.ts';
import { formatNumber } from '../../utils/format.ts';
import { SimpleTable } from './SimpleTable.tsx';

export interface ConversionObservationsTableProps {
  conversionObservations: TradingState['observations']['conversionObservations'];
}

export function ConversionObservationsTable({ conversionObservations }: ConversionObservationsTableProps): ReactNode {
  const rows: ReactNode[] = [];
  for (const [product, observation] of Object.entries(conversionObservations)) {
    rows.push(
      <Table.Tr key={product}>
        <Table.Td>{product}</Table.Td>
        <Table.Td>{formatNumber(observation.bidPrice)}</Table.Td>
        <Table.Td>{formatNumber(observation.askPrice)}</Table.Td>
        <Table.Td>{formatNumber(observation.transportFees)}</Table.Td>
        <Table.Td>{formatNumber(observation.exportTariff)}</Table.Td>
        <Table.Td>{formatNumber(observation.importTariff)}</Table.Td>
        <Table.Td>{formatNumber(observation.sunlight)}</Table.Td>
        <Table.Td>{formatNumber(observation.humidity)}</Table.Td>
      </Table.Tr>,
    );
  }

  return (
    <SimpleTable
      label="conversion observations"
      columns={[
        'Product',
        'Bid price',
        'Ask price',
        'Transport fees',
        'Export tariff',
        'Import tariff',
        'Sunlight',
        'Humidity',
      ]}
      rows={rows}
    />
  );
}
