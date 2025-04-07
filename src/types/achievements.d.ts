export type Achievement = {
  achieved: 0 | 1;
  description: string;
  displayName: string;
  hidden: 0 | 1;
  icon: string;
  icongray: string;
  id: string | undefined;
  name: string;
  unlocktime: number;
  value: number | undefined;
};
