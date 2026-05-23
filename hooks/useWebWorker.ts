import { useEffect, useRef, useState, useCallback } from 'react';

export function useWebWorker<TIn, TOut>(workerFactory: () => Worker) {
  const [result, setResult] = useState<TOut | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  // We need to pass the factory wrapped in a callback from the component
  useEffect(() => {
    workerRef.current = workerFactory();

    workerRef.current.onmessage = (event: MessageEvent<{ result?: TOut; error?: string }>) => {
      setIsProcessing(false);
      if (event.data.error) {
        setError(event.data.error);
        setResult(null);
      } else if (event.data.result !== undefined) {
        setResult(event.data.result);
        setError(null);
      }
    };

    workerRef.current.onerror = (e) => {
      setIsProcessing(false);
      setError(e.message || 'Worker encountered an error');
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [workerFactory]);

  const postMessage = useCallback((data: TIn) => {
    if (workerRef.current) {
      setIsProcessing(true);
      setError(null);
      workerRef.current.postMessage(data);
    }
  }, []);

  return { result, error, isProcessing, postMessage };
}
