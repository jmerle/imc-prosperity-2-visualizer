import Highcharts from 'highcharts';
import { ReactNode } from 'react';
import { ProsperitySymbol } from '../../models.ts';
import { useStore } from '../../store.ts';
import { Chart } from './Chart.tsx';

export interface TransportChartProps {
  symbol: ProsperitySymbol;
}

export function TransportChart({ symbol }: TransportChartProps): ReactNode {
  const algorithm = useStore(state => state.algorithm)!;

  const transportFeesData = [];
  const importTariffData = [];
  const exportTariffData = [];

  for (const row of algorithm.data) {
    const observation = row.state.observations.conversionObservations[symbol];
    if (observation === undefined) {
      continue;
    }

    transportFeesData.push([row.state.timestamp, observation.transportFees]);
    importTariffData.push([row.state.timestamp, observation.importTariff]);
    exportTariffData.push([row.state.timestamp, observation.exportTariff]);
  }

  const series: Highcharts.SeriesOptionsType[] = [
    { type: 'line', name: 'Transport fees', data: transportFeesData },
    { type: 'line', name: 'Import tariff', marker: { symbol: 'triangle' }, data: importTariffData },
    { type: 'line', name: 'Export tariff', marker: { symbol: 'triangle-down' }, data: exportTariffData },
  ];

  return <Chart title={`${symbol} - Transport`} series={series} />;
}
