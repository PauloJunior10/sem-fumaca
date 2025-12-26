
export interface CigaretteLog {
  id: string;
  timestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  thresholdMs: number;
  iconName: string;
}

export interface UserData {
  logs: CigaretteLog[];
  lastReset: number;
  dailyGoal: number;
  pricePerPack: number;
  cigarettesPerPack: number;
  unlockedBadges: string[]; // IDs of badges already celebrated
}

export interface DailyStat {
  day: string;
  count: number;
}
