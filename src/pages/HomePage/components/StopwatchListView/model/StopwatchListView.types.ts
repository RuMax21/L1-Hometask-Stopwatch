import type { StopwatchItem } from "@/shared/types";

export interface StopwatchListViewProps {
  stopwatches: StopwatchItem[];
  onAdd: () => void;
  onRemove: (id: number) => void;
  onChange: (id: number, data: Partial<StopwatchItem>) => void;
}