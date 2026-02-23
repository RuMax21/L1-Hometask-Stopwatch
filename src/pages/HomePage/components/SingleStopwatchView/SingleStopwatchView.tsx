import { memo } from 'react';
import styles from './SingleStopwatchView.module.scss';
import { formatTime } from '@/shared/utils';
import Button from '@/shared/ui/Button';
import type { SingleStopwatchProps } from './model';

function SingleStopwatch({
  id,
  time,
  isRunning,
  onStart,
  onPause,
  onReset,
  onRemove
}: SingleStopwatchProps) {
  return (
    <div className={styles.stopwatch}>
      <h2 className={styles.time}>{formatTime(time)}</h2>
      <div className={styles.controls}>
        {!isRunning ? (
          <Button onClick={onStart} className={`${styles.button} ${styles.startButton}`}>
            {time ? 'Resume' : 'Start'}
          </Button>
        ) : (
          <Button onClick={onPause} className={`${styles.button} ${styles.pauseButton}`}>
            Pause
          </Button>
        )}
        <Button
          onClick={onReset}
          disabled={!time}
          className={`${styles.button} ${styles.resetButton}`}
        >
          Reset
        </Button>
        {onRemove && (
          <Button onClick={() => onRemove(id)} className={`${styles.button} ${styles.removeButton}`}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}

export default memo(SingleStopwatch);
