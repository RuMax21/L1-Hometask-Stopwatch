export interface SingleStopwatchProps {
  id: number;
  time: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onRemove: (id: number) => void;
}
