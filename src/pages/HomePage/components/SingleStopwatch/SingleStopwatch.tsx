import { useEffect } from 'react';
import styles from './SingleStopwatch.module.scss';
import type { SingleStopwatchProps } from '@/pages/HomePage/components/SingleStopwatch/model/SingleStopwatch.types';
import { STOPWATCH } from '@/shared/constants';
import { formatTime } from '@/shared/utils';
import Button from '@/shared/ui/Button';

export default function SingleStopwatch({
  id,
  time,
  isRunning,
  onTimeChange,
  onRunningChange,
  onRemove,
}: SingleStopwatchProps) {
  const handleStart = (): void => {
    if (isRunning) return;
    onRunningChange(id, true);
  };

  const handlePause = (): void => {
    if (!isRunning) return;
    onRunningChange(id, false);
  };

  const handleReset = (): void => {
    onRunningChange(id, false);
    onTimeChange(id, 0);
  };

  useEffect(() => {
    if (!isRunning) return;

    const startTime = Date.now() - time;

    const interval = setInterval(() => {
      onTimeChange(id, Date.now() - startTime);
    }, STOPWATCH.UPDATE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div className={styles.stopwatch}>
      <h2 className={styles.time}>{formatTime(time)}</h2>
      <div className={styles.controls}>
        {!isRunning ? (
          <Button onClick={handleStart} className={`${styles.button} ${styles.startButton}`}>
            {time ? 'Resume' : 'Start'}
          </Button>
        ) : (
          <Button onClick={handlePause} className={`${styles.button} ${styles.pauseButton}`}>
            Pause
          </Button>
        )}
        <Button
          onClick={handleReset}
          disabled={!time}
          className={`${styles.button} ${styles.resetButton}`}
        >
          Reset
        </Button>
        {onRemove && (
          <Button onClick={onRemove} className={`${styles.button} ${styles.removeButton}`}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
