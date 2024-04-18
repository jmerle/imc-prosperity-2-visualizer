import { Button, Grid, Group, Text, Title } from '@mantine/core';
import { ReactNode } from 'react';
import { ScrollableCodeHighlight } from '../../components/ScrollableCodeHighlight.tsx';
import { useAsync } from '../../hooks/use-async.ts';
import { useStore } from '../../store.ts';
import { downloadAlgorithmLogs, downloadAlgorithmResults } from '../../utils/algorithm.tsx';
import { formatTimestamp } from '../../utils/format.ts';
import { VisualizerCard } from './VisualizerCard.tsx';

export function AlgorithmSummaryCard(): ReactNode {
  const algorithm = useStore(state => state.algorithm)!;
  const summary = algorithm.summary!;

  const downloadLogs = useAsync<void>(async () => {
    await downloadAlgorithmLogs(summary.id);
  });

  const downloadResults = useAsync<void>(async () => {
    await downloadAlgorithmResults(summary.id);
  });

  return (
    <VisualizerCard title="Algorithm summary">
      <Grid columns={2}>
        <Grid.Col span={{ xs: 2, sm: 1 }}>
          <Grid columns={2}>
            <Grid.Col span={1}>
              <Title order={5}>Id</Title>
              <Text>{summary.id}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Title order={5}>File name</Title>
              <Text>{summary.fileName}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Title order={5}>Submitted at</Title>
              <Text>{formatTimestamp(summary.timestamp)}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Title order={5}>Submitted by</Title>
              <Text>
                {summary.user.firstName} {summary.user.lastName}
              </Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Title order={5}>Status</Title>
              <Text>{summary.status}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Title order={5}>Round</Title>
              <Text>{summary.round}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Title order={5}>Selected for round</Title>
              <Text>{summary.selectedForRound ? 'Yes' : 'No'}</Text>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={{ xs: 2, sm: 1 }}>
          <Title order={5}>Content</Title>
          <ScrollableCodeHighlight code={summary.content} language="python" />
        </Grid.Col>
        <Grid.Col span={2}>
          <Group grow>
            <Button variant="outline" onClick={downloadLogs.call} loading={downloadLogs.loading}>
              Download logs
            </Button>
            <Button variant="outline" onClick={downloadResults.call} loading={downloadResults.loading}>
              Download results
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </VisualizerCard>
  );
}
