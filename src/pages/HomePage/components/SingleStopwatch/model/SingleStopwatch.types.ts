export interface SingleStopwatchProps {
  id: number;
  time: number;
  isRunning: boolean;
  onTimeChange: (id: number, newTime: number) => void;
  onRunningChange: (id: number, isRunning: boolean) => void;
  onRemove: () => void;
}
