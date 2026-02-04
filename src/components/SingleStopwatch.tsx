import { useEffect, useState, useRef } from 'react';

interface SingleStopwatchProps {
  onRemove: () => void;
}

export default function SingleStopwatch({onRemove}: SingleStopwatchProps) {
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
    }, 100);
  }

  const handlePause = () => {
    if (!isRunning) return;

    setIsRunning(false);

    remainingTimeRef.current = Date.now() - startTimeRef.current;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);

    remainingTimeRef.current = 0;
    startTimeRef.current = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTime(0);
  }

  const formatTime = (ms: number): string => {
    const totalSeconds: number = Math.floor(ms / 1000);
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;
    const milliseconds: number = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: '10px'}}>
      <h2>
        {formatTime(time)}
      </h2>
      { (!isRunning) 
        ? (<button onClick={handleStart}> {time ? 'Resume' : 'Start'}</button>)
        : (<button onClick={handlePause}>Pause</button>)
      }
      <button onClick={handleReset} disabled={!time}>Reset</button>
      {onRemove && <button onClick={onRemove}>Remove</button> }
    </div>
  )
};
