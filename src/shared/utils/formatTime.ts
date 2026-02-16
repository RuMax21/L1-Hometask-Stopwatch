import { TIME_CONSTANTS } from "../constants";

export const formatTime = (ms: number): string => {
  const totalSeconds: number = Math.floor(ms / TIME_CONSTANTS.MILLISECONDS_PER_SECOND);
  const minutes: number = Math.floor(totalSeconds / TIME_CONSTANTS.SECONDS_PER_MINUTE);
  const seconds: number = totalSeconds % TIME_CONSTANTS.SECONDS_PER_MINUTE;
  const milliseconds: number = Math.floor((ms % TIME_CONSTANTS.MILLISECONDS_PER_SECOND) / 10);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
};
