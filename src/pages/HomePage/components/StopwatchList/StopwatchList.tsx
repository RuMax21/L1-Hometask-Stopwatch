import { useState } from 'react';
import styles from './StopwatchList.module.scss';
import Button from '@/shared/ui/Button';
import SingleStopwatch from '@/pages/HomePage/components/SingleStopwatch';

export default function StopwatchList() {
  const [stopwatches, setStopwatches] = useState<number[]>([]);

  const addStopwatch = () => {
    const id = Date.now();
    setStopwatches(prev => [...prev, id]);
  };

  const removeStopwatch = (id: number) => {
    setStopwatches(prev => prev.filter(stopwatch => stopwatch !== id));
  };

  return (
    <div className={styles.stopwatchList}>
      <h1 className={styles.title}>Stopwatch</h1>

      {stopwatches.length !== 0 ? (
        <div className={styles.items}>
          {stopwatches.map(stopwatch => (
            <SingleStopwatch key={stopwatch} onRemove={() => removeStopwatch(stopwatch)} />
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
