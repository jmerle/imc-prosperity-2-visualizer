import Highcharts from 'highcharts';
import { ReactNode } from 'react';
import { ProsperitySymbol } from '../../models.ts';
import { useStore } from '../../store.ts';
import { getAskColor, getBidColor } from '../../utils/colors.ts';
import { Chart } from './Chart.tsx';

export interface ConversionPriceChartProps {
  symbol: ProsperitySymbol;
}

export function ConversionPriceChart({ symbol }: ConversionPriceChartProps): ReactNode {
  const algorithm = useStore(state => state.algorithm)!;

  const bidPriceData = [];
  const askPriceData = [];

  for (const row of algorithm.data) {
    const observation = row.state.observations.conversionObservations[symbol];
    if (observation === undefined) {
      continue;
    }

    bidPriceData.push([row.state.timestamp, observation.bidPrice]);
    askPriceData.push([row.state.timestamp, observation.askPrice]);
  }

  const options: Highcharts.Options = {
    yAxis: {
      opposite: true,
      allowDecimals: true,
    },
  };

  const series: Highcharts.SeriesOptionsType[] = [
    { type: 'line', name: 'Bid', color: getBidColor(1.0), marker: { symbol: 'triangle' }, data: bidPriceData },
    { type: 'line', name: 'Ask', color: getAskColor(1.0), marker: { symbol: 'triangle-down' }, data: askPriceData },
  ];

  return <Chart title={`${symbol} - Conversion price`} options={options} series={series} />;
}
