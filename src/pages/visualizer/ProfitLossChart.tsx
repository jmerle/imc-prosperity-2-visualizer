import Highcharts from 'highcharts';
import { ReactNode } from 'react';
import { useStore } from '../../store.ts';
import { Chart } from './Chart.tsx';

export function ProfitLossChart(): ReactNode {
  const algorithm = useStore(state => state.algorithm)!;

  const dataByTimestamp = new Map<number, number>();
  for (const row of algorithm.activityLogs) {
    if (!dataByTimestamp.has(row.timestamp)) {
      dataByTimestamp.set(row.timestamp, row.profitLoss);
    } else {
      dataByTimestamp.set(row.timestamp, dataByTimestamp.get(row.timestamp)! + row.profitLoss);
    }
  }

  const series: Highcharts.SeriesOptionsType[] = [
    {
      type: 'line',
      name: 'Total',
      data: [...dataByTimestamp.keys()].map(timestamp => [timestamp, dataByTimestamp.get(timestamp)]),
    },
  ];

  Object.keys(algorithm.data[0].state.listings)
    .sort((a, b) => a.localeCompare(b))
    .forEach(symbol => {
      const data = [];

      for (const row of algorithm.activityLogs) {
        if (row.product === symbol) {
          data.push([row.timestamp, row.profitLoss]);
        }
      }

      series.push({
        type: 'line',
        name: symbol,
        data,
        dashStyle: 'Dash',
      });
    });

  return <Chart title="Profit / Loss" series={series} />;
}
