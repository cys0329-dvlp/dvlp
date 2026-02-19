
export type HealthMetricType = 'sleep' | 'exercise' | 'diet' | 'mood';

export interface HealthLog {
  id: string;
  type: HealthMetricType;
  value: number; // For sleep (hours), exercise (minutes), mood (1-10)
  note: string;
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  goal: string;
  isPremium: boolean;
}

export interface WellnessRoutine {
  title: string;
  activities: {
    category: string;
    description: string;
  }[];
  advice: string;
}

export interface AppState {
  user: UserProfile | null;
  logs: HealthLog[];
  routines: WellnessRoutine[];
}
