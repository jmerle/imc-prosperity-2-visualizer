import { Center, Container, Grid, Title } from '@mantine/core';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store.ts';
import { formatNumber } from '../../utils/format.ts';
import { AlgorithmSummaryCard } from './AlgorithmSummaryCard.tsx';
import { PositionChart } from './PositionChart.tsx';
import { PriceChart } from './PriceChart.tsx';
import { ProfitLossChart } from './ProfitLossChart.tsx';
import { SandboxLogsCard } from './SandboxLogsCard.tsx';
import { VisualizerCard } from './VisualizerCard.tsx';
import { VolumeChart } from './VolumeChart.tsx';

export function VisualizerPage(): ReactNode {
  const algorithm = useStore(state => state.algorithm);

  const { search } = useLocation();

  if (algorithm === null) {
    return <Navigate to={`/${search}`} />;
  }

  let profitLoss = 0;
  const lastTimestamp = algorithm.activityLogs[algorithm.activityLogs.length - 1].timestamp;
  for (let i = algorithm.activityLogs.length - 1; i >= 0 && algorithm.activityLogs[i].timestamp == lastTimestamp; i--) {
    profitLoss += algorithm.activityLogs[i].profitLoss;
  }

  const symbolColumns: ReactNode[] = [];
  Object.keys(algorithm.sandboxLogs[0].state.listings)
    .sort((a, b) => a.localeCompare(b))
    .forEach((symbol, i) => {
      symbolColumns.push(
        <Grid.Col key={i * 2} span={{ xs: 12, sm: 6 }}>
          <PriceChart symbol={symbol} />
        </Grid.Col>,
      );

      symbolColumns.push(
        <Grid.Col key={i * 2 + 1} span={{ xs: 12, sm: 6 }}>
          <VolumeChart symbol={symbol} />
        </Grid.Col>,
      );
    });

  return (
    <Container fluid>
      <Grid>
        <Grid.Col span={12}>
          <VisualizerCard>
            <Center>
              <Title order={2}>Final Profit / Loss: {formatNumber(profitLoss)}</Title>
            </Center>
          </VisualizerCard>
        </Grid.Col>
        <Grid.Col span={{ xs: 12, sm: 6 }}>
          <ProfitLossChart />
        </Grid.Col>
        <Grid.Col span={{ xs: 12, sm: 6 }}>
          <PositionChart />
        </Grid.Col>
        {symbolColumns}
        <Grid.Col span={12}>
          <SandboxLogsCard />
        </Grid.Col>
        {algorithm.summary && (
          <Grid.Col span={12}>
            <AlgorithmSummaryCard />
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
}
