import { useCallback, useEffect, useState } from 'react';
import type { StopwatchItem } from '@/shared/types';
import { STORAGE_KEY } from '@/shared/constants';
import StopwatchList from "../StopwatchListView/StopwatchListView";

export default function StopwatchListContainer() {
  const [stopwatches, setStopwatches] = useState<StopwatchItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    return [];
  });

  const addStopwatch = useCallback((): void => {
    setStopwatches(prev => [...prev, { id: Date.now(), time: 0, isRunning: false }]);
  }, []);

  const removeStopwatch = useCallback((id: number): void => {
    setStopwatches(prev => prev.filter(stopwatch => stopwatch.id !== id));
  }, []);

  const onChange = useCallback((id: number, data: Partial<StopwatchItem>): void => {
    setStopwatches(prev =>
      prev.map(stopwatch => (stopwatch.id === id ? { ...stopwatch, ...data } : stopwatch))
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stopwatches));
  }, [stopwatches]);

  return (
    <StopwatchList
      stopwatches={stopwatches}
      onAdd={addStopwatch}
      onRemove={removeStopwatch}
      onChange={onChange}
    />
  )
};
