import { Alert, AlertProps } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { ReactNode } from 'react';

export interface ErrorAlertProps extends Partial<AlertProps> {
  error: Error;
}

export function ErrorAlert({ error, ...alertProps }: ErrorAlertProps): ReactNode {
  return (
    <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" {...alertProps}>
      {error.message}
    </Alert>
  );
}
