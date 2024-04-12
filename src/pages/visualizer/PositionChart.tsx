import Highcharts from 'highcharts';
import { ReactNode } from 'react';
import { Algorithm, ProsperitySymbol } from '../../models.ts';
import { useStore } from '../../store.ts';
import { Chart } from './Chart.tsx';

function getLimit(algorithm: Algorithm, symbol: ProsperitySymbol): number {
  const knownLimits: Record<string, number> = {
    AMETHYSTS: 20,
    STARFRUIT: 20,
    ORCHIDS: 100,
  };

  if (knownLimits[symbol] !== undefined) {
    return knownLimits[symbol];
  }

  // This code will be hit when a new product is added to the competition and the visualizer isn't updated yet
  // In that case the visualizer doesn't know the real limit yet, so we make a guess based on the algorithm's positions

  const product = algorithm.data[0].state.listings[symbol].product;

  const positions = algorithm.data.map(row => row.state.position[product] || 0);
  const minPosition = Math.min(...positions);
  const maxPosition = Math.max(...positions);

  return Math.max(Math.abs(minPosition), maxPosition);
}

export function PositionChart(): ReactNode {
  const algorithm = useStore(state => state.algorithm)!;

  const symbols = Object.keys(algorithm.data[0].state.listings).sort((a, b) => a.localeCompare(b));

  const limits: Record<string, number> = {};
  for (const symbol of symbols) {
    limits[symbol] = getLimit(algorithm, symbol);
  }

  const data: Record<string, [number, number][]> = {};
  for (const symbol of symbols) {
    data[symbol] = [];
  }

  for (const row of algorithm.data) {
    for (const symbol of symbols) {
      const position = row.state.position[symbol] || 0;
      data[symbol].push([row.state.timestamp, (position / limits[symbol]) * 100]);
    }
  }

  const series: Highcharts.SeriesOptionsType[] = symbols.map(symbol => ({
    type: 'line',
    name: symbol,
    data: data[symbol],
  }));

  return <Chart title="Positions (% of limit)" series={series} min={-100} max={100} />;
}
