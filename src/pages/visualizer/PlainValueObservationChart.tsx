import Highcharts from 'highcharts';
import { ReactNode } from 'react';
import { ProsperitySymbol } from '../../models.ts';
import { useStore } from '../../store.ts';
import { Chart } from './Chart.tsx';

export interface PlainValueObservationChartProps {
  symbol: ProsperitySymbol;
}

export function PlainValueObservationChart({ symbol }: PlainValueObservationChartProps): ReactNode {
  const algorithm = useStore(state => state.algorithm)!;

  const values = [];

  for (const row of algorithm.data) {
    const observation = row.state.observations.plainValueObservations[symbol];
    if (observation === undefined) {
      continue;
    }

    values.push([row.state.timestamp, observation]);
  }

  const options: Highcharts.Options = {
    yAxis: {
      allowDecimals: true,
    },
  };

  const series: Highcharts.SeriesOptionsType[] = [{ type: 'line', name: 'Value', data: values }];

  return <Chart title={`${symbol} - Plain value observation`} options={options} series={series} />;
}
