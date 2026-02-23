import styles from './StopwatchListView.module.scss';
import Button from '@/shared/ui/Button';
import type { StopwatchListViewProps } from './model';
import SingleStopwatchContainer from '../SingleStopwatchContainer/SingleStopwatchContainer';

export default function StopwatchList({
  stopwatches,
  onAdd,
  onRemove,
  onChange
}: StopwatchListViewProps) {
  
  return (
    <div className={styles.stopwatchList}>
      <h1 className={styles.title}>Stopwatch</h1>
      {stopwatches.length !== 0 ? (
        <div className={styles.items}>
          {stopwatches.map(stopwatch => (
            <SingleStopwatchContainer
              key={stopwatch.id}
              {...stopwatch}
              onChange={onChange}
              onRemove={onRemove}
            />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>The stopwatch has not been added yet.</p>
      )}

      <div>
        <Button onClick={onAdd}>Add stopwatch</Button>
      </div>
    </div>
  );
}
