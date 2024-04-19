import { Table, Text } from '@mantine/core';
import { ReactNode } from 'react';

export interface SimpleTableProps {
  label: string;
  columns: string[];
  rows: ReactNode[];
}

export function SimpleTable({ label, columns, rows }: SimpleTableProps): ReactNode {
  if (rows.length === 0) {
    return <Text>Timestamp has no {label}</Text>;
  }

  return (
    <Table.ScrollContainer minWidth={300}>
      <Table withColumnBorders horizontalSpacing={8} verticalSpacing={4}>
        <Table.Thead>
          <Table.Tr>
            {columns.map((column, i) => (
              <Table.Th key={i}>{column}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
