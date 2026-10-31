export type StatType = 'strength' | 'endurance' | 'mobility' | 'grip' | 'vitality' | 'recovery';

export type TrainingStage = 1 | 2 | 3 | 4;

export interface ExerciseRewards {
  xp: number;
  credits: number;
  statType: StatType;
  statXp: number;
}

export interface Exercise {
  id: string;
  name: string;
  dayId: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'extra';
  category: 'legs' | 'grip' | 'mobility' | 'breathing' | 'endurance' | 'extra';
  type: 'reps' | 'timer';
  defaultSets: number;
  defaultReps: number;
  defaultDurationSec: number;
  restSec: number;
  targetMuscles: string[];
  targetJoints: string[];
  instructions: string[];
  techniqueNotes: string;
  rewards: ExerciseRewards;
  svgType: string;
  customImageUri?: string;
}

export interface WorkoutDay {
  id: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  nameRu: string;
  focusRu: string;
  isRestDay: boolean;
  estDurationMin: number;
  exerciseIds: string[];
  description: string;
}

export interface ActiveWorkoutState {
  dayId: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'extra';
  exerciseIndex: number;
  currentSet: number;
  totalSets: number;
  currentReps: number;
  targetReps: number;
  isTimerRunning: boolean;
  timerRemainingSec: number;
  targetDurationSec: number;
  isResting: boolean;
  restRemainingSec: number;
  targetRestSec: number;
  completedExercisesCount: number;
  earnedXpThisSession: number;
  earnedCreditsThisSession: number;
  isCompleted: boolean;
  startTime: number;
}

export interface PlayerStats {
  strength: number;
  endurance: number;
  mobility: number;
  grip: number;
  vitality: number;
  recovery: number;
}

export interface Buff {
  id: string;
  name: string;
  icon: string;
  type: 'xp' | 'credits' | 'recovery' | 'energy';
  multiplier: number;
  expiresAt: number; // timestamp
  durationMinutes: number;
  description: string;
}

export interface ShopItem {
  id: string;
  name: string;
  category: 'skin' | 'aura' | 'theme' | 'accessory' | 'buff' | 'track';
  priceCredits: number;
  priceTokens: number;
  icon: string;
  description: string;
  unlocked: boolean;
  equipped?: boolean;
  buffData?: {
    type: 'xp' | 'credits' | 'recovery' | 'energy';
    multiplier: number;
    durationMinutes: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'workout' | 'level' | 'streak' | 'stats' | 'special';
  currentProgress: number;
  maxProgress: number;
  unlocked: boolean;
  rewardCredits: number;
  rewardTokens: number;
  rewardTitle?: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  currentProgress: number;
  target: number;
  completed: boolean;
  claimed: boolean;
  rewardXp: number;
  rewardCredits: number;
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  checkedIn: boolean;
  workoutCompleted: boolean;
  dayName: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  durationSec: number;
  type: 'synth' | 'custom';
  audioUrl?: string; // object URL or data URL
}

export type ThemePreset = 'blood-dragon' | 'miami-vice' | 'matrix' | 'outrun' | 'void';

export interface UserSettings {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  hapticsEnabled: boolean;
  crtFilterEnabled: boolean;
  animationsEnabled: boolean;
  theme: ThemePreset;
  currentStage: TrainingStage;
  defaultRestSec: number;
  reminderHour: number;
  reminderMinute: number;
  reminderEnabled: boolean;
  units: 'metric' | 'imperial';
}

export interface FloatingText {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
}
