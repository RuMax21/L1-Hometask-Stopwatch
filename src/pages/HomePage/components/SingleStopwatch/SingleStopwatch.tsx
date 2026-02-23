import { useEffect, memo } from 'react';
import styles from './SingleStopwatch.module.scss';
import type { SingleStopwatchProps } from '@/pages/HomePage/components/SingleStopwatch/model/SingleStopwatch.types';
import { STOPWATCH } from '@/shared/constants';
import { formatTime } from '@/shared/utils';
import Button from '@/shared/ui/Button';

function SingleStopwatch({
  id,
  time,
  isRunning,
  onChange,
  onRemove,
}: SingleStopwatchProps) {
  const handleStart = (): void => {
    if (isRunning) return;
    onChange(id, {isRunning: true});
  };

  const handlePause = (): void => {
    if (!isRunning) return;
    onChange(id, {isRunning: false});
  };

  const handleReset = (): void => {
    onChange(id, {isRunning: false});
    onChange(id, {time: 0});
  };

  useEffect(() => {
    if (!isRunning) return;

    const startTime = Date.now() - time;

    const interval = setInterval(() => {
      onChange(id, { time: Date.now() - startTime });
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

export default memo(SingleStopwatch);
