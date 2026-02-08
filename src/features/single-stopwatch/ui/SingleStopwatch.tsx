import { useEffect, useState, useRef } from 'react';
import './SingleStopwatch.scss';
import type { SingleStopwatchProps } from '@/single-stopwatch/model/SingleStopwatch.types';
import { TIME_CONSTANTS, STOPWATCH } from '@/shared/constants';
import Button from '@/shared/ui/Button';

export default function SingleStopwatch({ onRemove }: SingleStopwatchProps) {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingTimeRef = useRef<number>(0);

  const handleStart = () => {
    if (isRunning) return;

    setIsRunning(true);

    startTimeRef.current = Date.now() - remainingTimeRef.current;
    intervalRef.current = setInterval(() => {
      remainingTimeRef.current = Date.now() - startTimeRef.current;
      setTime(remainingTimeRef.current);
    }, STOPWATCH.UPDATE_INTERVAL_MS);
  };

  const handlePause = () => {
    if (!isRunning) return;

    setIsRunning(false);

    remainingTimeRef.current = Date.now() - startTimeRef.current;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);

    remainingTimeRef.current = 0;
    startTimeRef.current = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const formatTime = (ms: number): string => {
    const totalSeconds: number = Math.floor(ms / TIME_CONSTANTS.MILLISECONDS_PER_SECOND);
    const minutes: number = Math.floor(totalSeconds / TIME_CONSTANTS.SECONDS_PER_MINUTE);
    const seconds: number = totalSeconds % TIME_CONSTANTS.SECONDS_PER_MINUTE;
    const milliseconds: number = Math.floor((ms % TIME_CONSTANTS.MILLISECONDS_PER_SECOND) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
