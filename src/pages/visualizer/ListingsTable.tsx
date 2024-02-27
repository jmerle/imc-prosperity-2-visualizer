import { Table } from '@mantine/core';
import { ReactNode } from 'react';
import { TradingState } from '../../models.ts';
import { SimpleTable } from './SimpleTable.tsx';

export interface ListingsTableProps {
  listings: TradingState['listings'];
}

export function ListingsTable({ listings }: ListingsTableProps): ReactNode {
  return (
    <SimpleTable
      label="listings"
      columns={['Symbol', 'Product', 'Denomination']}
      rows={Object.entries(listings).map(([symbol, listing]) => (
        <Table.Tr key={symbol}>
          <Table.Td>{listing.symbol}</Table.Td>
          <Table.Td>{listing.product}</Table.Td>
          <Table.Td>{listing.denomination}</Table.Td>
        </Table.Tr>
      ))}
    />
  );
}
