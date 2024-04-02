import { Table, Text } from '@mantine/core';
import { ReactNode } from 'react';
import { OrderDepth } from '../../models.ts';
import { getAskColor, getBidColor } from '../../utils/colors.ts';
import { formatNumber } from '../../utils/format.ts';
import { OrderDepthTableSpreadRow } from './OrderDepthTableSpreadRow.tsx';

export interface OrderDepthTableProps {
  orderDepth: OrderDepth;
}

export function OrderDepthTable({ orderDepth }: OrderDepthTableProps): ReactNode {
  const rows: ReactNode[] = [];

  const askPrices = Object.keys(orderDepth.sellOrders)
    .map(Number)
    .sort((a, b) => b - a);
  const bidPrices = Object.keys(orderDepth.buyOrders)
    .map(Number)
    .sort((a, b) => b - a);

  for (let i = 0; i < askPrices.length; i++) {
    const price = askPrices[i];

    if (i > 0 && askPrices[i - 1] - price > 1) {
      rows.push(<OrderDepthTableSpreadRow key={`${price}-ask-spread`} spread={askPrices[i - 1] - price} />);
    }

    rows.push(
      <Table.Tr key={`${price}-ask`}>
        <Table.Td></Table.Td>
        <Table.Td style={{ textAlign: 'center' }}>{formatNumber(price)}</Table.Td>
        <Table.Td style={{ backgroundColor: getAskColor(0.1) }}>
          {formatNumber(Math.abs(orderDepth.sellOrders[price]))}
        </Table.Td>
      </Table.Tr>,
    );
  }

  if (askPrices.length > 0 && bidPrices.length > 0 && askPrices[askPrices.length - 1] !== bidPrices[0]) {
    rows.push(<OrderDepthTableSpreadRow key="spread" spread={askPrices[askPrices.length - 1] - bidPrices[0]} />);
  }

  for (let i = 0; i < bidPrices.length; i++) {
    const price = bidPrices[i];

    if (i > 0 && bidPrices[i - 1] - price > 1) {
      rows.push(<OrderDepthTableSpreadRow key={`${price}-bid-spread`} spread={bidPrices[i - 1] - price} />);
    }

    rows.push(
      <Table.Tr key={`${price}-bid`}>
        <Table.Td style={{ backgroundColor: getBidColor(0.1), textAlign: 'right' }}>
          {formatNumber(orderDepth.buyOrders[price])}
        </Table.Td>
        <Table.Td style={{ textAlign: 'center' }}>{formatNumber(price)}</Table.Td>
        <Table.Td></Table.Td>
      </Table.Tr>,
    );
  }

  if (rows.length === 0) {
    return <Text>Timestamp has no order depth</Text>;
  }

  return (
    <Table withColumnBorders horizontalSpacing={8} verticalSpacing={4}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ textAlign: 'right' }}>Bid volume</Table.Th>
          <Table.Th style={{ textAlign: 'center' }}>Price</Table.Th>
          <Table.Th>Ask volume</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
