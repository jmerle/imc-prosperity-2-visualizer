import { Table } from '@mantine/core';
import { ReactNode } from 'react';
import { formatNumber } from '../../utils/format.ts';

export interface OrderDepthTableSpreadRowProps {
  spread: number;
}

export function OrderDepthTableSpreadRow({ spread }: OrderDepthTableSpreadRowProps): ReactNode {
  return (
    <Table.Tr>
      <Table.Td></Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>↑ {formatNumber(spread)} ↓</Table.Td>
      <Table.Td></Table.Td>
    </Table.Tr>
  );
}
