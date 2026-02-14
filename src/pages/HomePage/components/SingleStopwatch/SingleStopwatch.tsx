import { useEffect, useState } from 'react';
import './SingleStopwatch.scss';
import type { SingleStopwatchProps } from '@/pages/HomePage/components/SingleStopwatch/model/SingleStopwatch.types';
import { TIME_CONSTANTS, STOPWATCH } from '@/shared/constants';
import Button from '@/shared/ui/Button';

export default function SingleStopwatch({ onRemove }: SingleStopwatchProps) {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleStart = (): void => {
    if (isRunning) return;
    setIsRunning(true);
  };

  const handlePause = (): void => {
    if (!isRunning) return;
    setIsRunning(false);
  };

  const handleReset = (): void => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (ms: number): string => {
    const totalSeconds: number = Math.floor(ms / TIME_CONSTANTS.MILLISECONDS_PER_SECOND);
    const minutes: number = Math.floor(totalSeconds / TIME_CONSTANTS.SECONDS_PER_MINUTE);
    const seconds: number = totalSeconds % TIME_CONSTANTS.SECONDS_PER_MINUTE;
    const milliseconds: number = Math.floor((ms % TIME_CONSTANTS.MILLISECONDS_PER_SECOND) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const startTime = Date.now() - time;

    const interval = setInterval(() => {
      setTime(Date.now() - startTime);
    }, STOPWATCH.UPDATE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      // }
    };
  }, [isRunning]);

  return (
    <div className="stopwatch">
      <h2 className="stopwatch__time">{formatTime(time)}</h2>
      <div className="stopwatch__controls">
        {!isRunning ? (
          <Button onClick={handleStart} className="stopwatch__button stopwatch__button--start">
            {time ? 'Resume' : 'Start'}
          </Button>
        ) : (
          <Button onClick={handlePause} className="stopwatch_button stopwatch__button--pause">
            Pause
          </Button>
        )}
        <Button
          onClick={handleReset}
          disabled={!time}
          className="stopwatch__button stopwatch__button--reset"
        >
          Reset
        </Button>
        {onRemove && (
          <Button onClick={onRemove} className="stopwatch__button stopwatch__button--remove">
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
