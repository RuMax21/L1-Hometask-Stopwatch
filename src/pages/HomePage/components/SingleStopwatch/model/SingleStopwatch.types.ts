import type { StopwatchStatus } from "@/shared/types";

export interface SingleStopwatchProps {
  id: number;
  time: number;
  isRunning: boolean;
  onChange: (id: number, data: Partial<StopwatchStatus>) => void;
  onRemove: () => void;
}
