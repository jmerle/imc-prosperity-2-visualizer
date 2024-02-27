import { useCallback, useState } from 'react';

export interface UseAsyncReturn<T, F extends (...args: any) => Promise<T> = any> {
  call: F;
  result: T | undefined;
  success: boolean;
  loading: boolean;
  error: Error | undefined;
}

export function useAsync<T, F extends (...args: any) => Promise<T> = any>(func: F): UseAsyncReturn<T, F> {
  const [result, setResult] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error>();

  const wrapper = useCallback(
    async (...args: any) => {
      setLoading(true);
      setResult(undefined);
      setSuccess(false);
      setError(undefined);

      try {
        const newResult = await func(...args);

        setResult(newResult);
        setSuccess(true);

        return newResult;
      } catch (err) {
        console.error(err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [func],
  );

  return {
    call: wrapper as F,
    result,
    success,
    loading,
    error,
  };
}
