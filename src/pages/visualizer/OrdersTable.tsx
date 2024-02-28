import { Table } from '@mantine/core';
import { ReactNode } from 'react';
import { AlgorithmDataRow } from '../../models.ts';
import { getAskColor, getBidColor } from '../../utils/colors.ts';
import { formatNumber } from '../../utils/format.ts';
import { SimpleTable } from './SimpleTable.tsx';

export interface OrdersTableProps {
  orders: AlgorithmDataRow['orders'];
}

export function OrdersTable({ orders }: OrdersTableProps): ReactNode {
  const rows: ReactNode[] = [];
  for (const symbol of Object.keys(orders)) {
    for (let i = 0; i < orders[symbol].length; i++) {
      const order = orders[symbol][i];

      const colorFunc = order.quantity > 0 ? getBidColor : getAskColor;

      rows.push(
        <Table.Tr key={`${symbol}-${i}`} style={{ background: colorFunc(0.1) }}>
          <Table.Td>{order.symbol}</Table.Td>
          <Table.Td>{order.quantity > 0 ? 'Buy' : 'Sell'}</Table.Td>
          <Table.Td>{formatNumber(order.price)}</Table.Td>
          <Table.Td>{formatNumber(Math.abs(order.quantity))}</Table.Td>
        </Table.Tr>,
      );
    }
  }

  return <SimpleTable label="orders" columns={['Symbol', 'Type', 'Price', 'Quantity']} rows={rows} />;
}
