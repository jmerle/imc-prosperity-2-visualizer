import { Table } from '@mantine/core';
import { ReactNode } from 'react';
import { TradingState } from '../../models.ts';
import { getAskColor, getBidColor } from '../../utils/colors.ts';
import { formatNumber } from '../../utils/format.ts';
import { SimpleTable } from './SimpleTable.tsx';

export interface PositionTableProps {
  position: TradingState['position'];
}

export function PositionTable({ position }: PositionTableProps): ReactNode {
  const rows: ReactNode[] = [];
  for (const product of Object.keys(position)) {
    if (position[product] === 0) {
      continue;
    }

    const colorFunc = position[product] > 0 ? getBidColor : getAskColor;

    rows.push(
      <Table.Tr key={product} style={{ backgroundColor: colorFunc(0.1) }}>
        <Table.Td>{product}</Table.Td>
        <Table.Td>{formatNumber(position[product])}</Table.Td>
      </Table.Tr>,
    );
  }

  return <SimpleTable label="positions" columns={['Product', 'Position']} rows={rows} />;
}
