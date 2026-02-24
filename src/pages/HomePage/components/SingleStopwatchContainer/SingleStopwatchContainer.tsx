import { useEffect, memo } from 'react';
import { STOPWATCH } from '@/shared/constants';
import SingleStopwatchView from "../SingleStopwatchView";
import type { SingleStopwatchContainerProps } from './model';

function SingleStopwatchContainer({
  id,
  time,
  isRunning,
  onChange,
  onRemove,
}: SingleStopwatchContainerProps) {
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
    <SingleStopwatchView
      id={id}
      time={time}
      isRunning={isRunning}
      onStart={handleStart}
      onPause={handlePause}
      onReset={handleReset}
      onRemove={onRemove}
    />
  )
};

export default memo(SingleStopwatchContainer);
