import { CodeHighlight, CodeHighlightProps } from '@mantine/code-highlight';
import { ReactNode } from 'react';
import classes from './ScrollableCodeHighlight.module.css';

export function ScrollableCodeHighlight(props: CodeHighlightProps): ReactNode {
  return <CodeHighlight {...props} className={classes.container} />;
}
