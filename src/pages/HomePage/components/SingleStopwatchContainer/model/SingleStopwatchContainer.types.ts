import type { StopwatchItem } from "@/shared/types";

export interface SingleStopwatchContainerProps {
  id: number;
  time: number;
  isRunning: boolean;
  onChange: (id: number, data: Partial<StopwatchItem>) => void;
  onRemove: (id: number) => void;
}