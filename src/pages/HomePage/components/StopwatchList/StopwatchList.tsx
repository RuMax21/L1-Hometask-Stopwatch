import { useCallback, useEffect, useState } from 'react';
import styles from './StopwatchList.module.scss';
import Button from '@/shared/ui/Button';
import SingleStopwatch from '@/pages/HomePage/components/SingleStopwatch';
import type { StopwatchStatus } from '@/shared/types';
import { STORAGE_KEY } from '@/shared/constants';

export default function StopwatchList() {
  const [stopwatches, setStopwatches] = useState<StopwatchStatus[]>(() => {
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

  const onChange = (id: number, data: Partial<StopwatchStatus>): void => {
    setStopwatches(prev =>
      prev.map(stopwatch => (stopwatch.id === id ? { ...stopwatch, ...data } : stopwatch))
    );
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stopwatches));
  }, [stopwatches]);

  return (
    <div className={styles.stopwatchList}>
      <h1 className={styles.title}>Stopwatch</h1>

      {stopwatches.length !== 0 ? (
        <div className={styles.items}>
          {stopwatches.map(stopwatch => (
            <SingleStopwatch
              key={stopwatch.id}
              {...stopwatch}
              onChange={onChange}
              onRemove={() => removeStopwatch(stopwatch.id)}
            />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>The stopwatch has not been added yet.</p>
      )}

      <div>
        <Button onClick={addStopwatch}>Add stopwatch</Button>
      </div>
    </div>
  );
}
