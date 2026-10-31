import { Achievement, AttendanceRecord, Buff, DailyQuest, PlayerStats, ShopItem, TrainingStage, UserSettings } from '../types';
import { INITIAL_ACHIEVEMENTS, INITIAL_DAILY_QUESTS, INITIAL_SHOP_ITEMS } from '../data/rpgData';

export interface GameStateStorage {
  version: number;
  level: number;
  xp: number;
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  credits: number;
  tokens: number;
  stats: PlayerStats;
  unallocatedStatPoints: number;
  equippedSkin: string;
  equippedAura: string;
  equippedTheme: string;
  equippedAccessories: string[];
  customAvatarUrl: string | null;
  shopItems: ShopItem[];
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  activeBuffs: Buff[];
  attendance: AttendanceRecord[];
  currentStreak: number;
  lastCheckinDate: string | null;
  totalRepsLogged: number;
  totalWorkoutsCompleted: number;
  exerciseCustomImages: Record<string, string>;
  settings: UserSettings;
  devModeUnlocked: boolean;
}

const STORAGE_KEY = 'neon_fitness_rpg_state_v1';

export const DEFAULT_INITIAL_STATE: GameStateStorage = {
  version: 1,
  level: 1,
  xp: 0,
  hp: 100,
  maxHp: 100,
  energy: 100,
  maxEnergy: 100,
  credits: 100,
  tokens: 5,
  stats: {
    strength: 5,
    endurance: 5,
    mobility: 5,
    grip: 5,
    vitality: 5,
    recovery: 5
  },
  unallocatedStatPoints: 3,
  equippedSkin: 'skin_default',
  equippedAura: 'aura_none',
  equippedTheme: 'theme_blood_dragon',
  equippedAccessories: [],
  customAvatarUrl: null,
  shopItems: INITIAL_SHOP_ITEMS,
  achievements: INITIAL_ACHIEVEMENTS,
  dailyQuests: INITIAL_DAILY_QUESTS,
  activeBuffs: [],
  attendance: [],
  currentStreak: 0,
  lastCheckinDate: null,
  totalRepsLogged: 0,
  totalWorkoutsCompleted: 0,
  exerciseCustomImages: {},
  settings: {
    masterVolume: 0.8,
    sfxVolume: 0.9,
    musicVolume: 0.6,
    hapticsEnabled: true,
    crtFilterEnabled: true,
    animationsEnabled: true,
    theme: 'blood-dragon',
    currentStage: 1 as TrainingStage,
    defaultRestSec: 45,
    reminderHour: 18,
    reminderMinute: 0,
    reminderEnabled: true,
    units: 'metric'
  },
  devModeUnlocked: false
};

export function loadGameState(): GameStateStorage {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_INITIAL_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_INITIAL_STATE,
      ...parsed,
      stats: { ...DEFAULT_INITIAL_STATE.stats, ...(parsed.stats || {}) },
      settings: { ...DEFAULT_INITIAL_STATE.settings, ...(parsed.settings || {}) }
    };
  } catch (err) {
    console.error('Failed to load local state, using defaults', err);
    return DEFAULT_INITIAL_STATE;
  }
}

export function saveGameState(state: GameStateStorage) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save local state', err);
  }
}

export function exportBackupJson(state: GameStateStorage): string {
  const jsonStr = JSON.stringify(state, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `neon_fitness_rpg_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  return jsonStr;
}

export function importBackupJson(jsonString: string): GameStateStorage | null {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed.level !== 'number') {
      throw new Error('Invalid backup schema');
    }
    const merged = { ...DEFAULT_INITIAL_STATE, ...parsed };
    saveGameState(merged);
    return merged;
  } catch (e) {
    console.error('Import failed', e);
    return null;
  }
}
