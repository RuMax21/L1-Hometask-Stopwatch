import { useState } from 'react';
import './StopwatchList.scss';
import Button from '@/shared/ui/Button';
import SingleStopwatch from '@/features/SingleStopwatch';

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
    <div className="stopwatch-list">
      <h1 className="stopwatch-list__title">Stopwatch</h1>

      {stopwatches.length !== 0 ? (
        <div className="stopwatch-list__items">
          {stopwatches.map(stopwatch => (
            <SingleStopwatch key={stopwatch} onRemove={() => removeStopwatch(stopwatch)} />
          ))}
        </div>
      ) : (
        <p className="stopwatch-list__empty">The stopwatch has not been added yet.</p>
      )}

      <div className="stopwatch-list__add-button">
        <Button onClick={addStopwatch}>Add stopwatch</Button>
      </div>
    </div>
  );
}
