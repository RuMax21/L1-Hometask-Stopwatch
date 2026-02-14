import { useEffect, useState } from 'react';
import styles from './StopwatchList.module.scss';
import Button from '@/shared/ui/Button';
import SingleStopwatch from '@/pages/HomePage/components/SingleStopwatch';
import type { StopwatchStatus } from './model';
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

  const addStopwatch = (): void => {
    setStopwatches(prev => [...prev, { id: Date.now(), time: 0, isRunning: false }]);
  };

  const removeStopwatch = (id: number): void => {
    setStopwatches(prev => prev.filter(stopwatch => stopwatch.id !== id));
  };

  const onTimeChange = (id: number, newTime: number): void => {
    setStopwatches(prev =>
      prev.map(stopwatch => (stopwatch.id === id ? { ...stopwatch, time: newTime } : stopwatch))
    );
  };

  const onRunningChange = (id: number, isRunning: boolean): void => {
    setStopwatches(prev =>
      prev.map(stopwatch => (stopwatch.id === id ? { ...stopwatch, isRunning } : stopwatch))
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
              id={stopwatch.id}
              time={stopwatch.time}
              isRunning={stopwatch.isRunning}
              onTimeChange={onTimeChange}
              onRunningChange={onRunningChange}
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
