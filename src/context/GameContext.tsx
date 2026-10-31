import React, { createContext, useContext, useEffect, useState, useCallback, useTransition } from 'react';
import {
  Achievement,
  AttendanceRecord,
  Buff,
  DailyQuest,
  FloatingText,
  PlayerStats,
  ShopItem,
  StatType,
  TrainingStage,
  UserSettings
} from '../types';
import { ALL_EXERCISES, WORKOUT_DAYS } from '../data/exercisesData';
import { getXpRequiredForLevel, LEVEL_TITLES } from '../data/rpgData';
import { soundFx } from '../utils/soundEffects';
import {
  exportBackupJson,
  importBackupJson,
  loadGameState,
  saveGameState,
  GameStateStorage
} from '../utils/storage';
import confetti from 'canvas-confetti';

interface GameContextType {
  // State
  state: GameStateStorage;
  xpToNextLevel: number;
  currentTitle: string;
  currentTitleColor: string;
  floatingTexts: FloatingText[];
  isLevelUpModalOpen: boolean;
  levelUpData: { oldLevel: number; newLevel: number; statPointsGained: number } | null;
  selectedDayId: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  activeExerciseIndex: number;
  currentSet: number;
  targetSets: number;
  currentReps: number;
  targetReps: number;
  isResting: boolean;
  restTimerSeconds: number;
  isTimerRunning: boolean;
  timerSeconds: number;
  isWorkoutSessionActive: boolean;

  // Actions
  setSelectedDayId: (dayId: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun') => void;
  startWorkout: (dayId?: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun') => void;
  logRepetition: (exerciseId: string) => void;
  finishCurrentSet: () => void;
  skipRestTimer: () => void;
  nextExercise: () => void;
  prevExercise: () => void;
  toggleExerciseTimer: () => void;
  finishWorkoutSession: () => void;
  cancelWorkoutSession: () => void;

  // RPG & Upgrades
  allocateStatPoint: (stat: StatType) => void;
  closeLevelUpModal: () => void;
  buyShopItem: (itemId: string) => boolean;
  equipShopItem: (itemId: string) => void;
  claimDailyAttendance: () => boolean;
  claimQuestReward: (questId: string) => void;
  claimAchievementReward: (achievementId: string) => void;

  // Media & Customization
  setCustomAvatar: (dataUrl: string | null) => void;
  setExerciseCustomImage: (exerciseId: string, dataUrl: string) => void;
  removeExerciseCustomImage: (exerciseId: string) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;

  // Dev Mode
  unlockDevMode: () => void;
  devUpdateStat: (stat: StatType, val: number) => void;
  devAddCurrency: (credits: number, tokens: number) => void;
  devSetLevel: (level: number) => void;
  devUnlockAll: () => void;
  devResetProgress: () => void;
  exportData: () => void;
  importData: (jsonStr: string) => boolean;
  triggerHaptic: () => void;
  showFloatingNotice: (text: string, color?: string, x?: number, y?: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameStateStorage>(() => loadGameState());
  const [, startTransition] = useTransition();

  // Floating text feedback (XP, Coins, Level up popups)
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  // Level Up Modal
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ oldLevel: number; newLevel: number; statPointsGained: number } | null>(null);

  // Workout Session State
  const [selectedDayId, setSelectedDayId] = useState<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>('mon');
  const [isWorkoutSessionActive, setIsWorkoutSessionActive] = useState(false);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [targetSets, setTargetSets] = useState(3);
  const [currentReps, setCurrentReps] = useState(0);
  const [targetReps, setTargetReps] = useState(12);

  // Timers
  const [isResting, setIsResting] = useState(false);
  const [restTimerSeconds, setRestTimerSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(30);

  // Synchronize audio volumes with settings
  useEffect(() => {
    soundFx.setVolumes(
      state.settings.masterVolume,
      state.settings.sfxVolume,
      state.settings.musicVolume
    );
  }, [state.settings.masterVolume, state.settings.sfxVolume, state.settings.musicVolume]);

  // Persist state to local storage on changes
  useEffect(() => {
    saveGameState(state);
  }, [state]);

  // Periodic Energy Regeneration & Buff Countdown Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setState(prev => {
        // 1. Expire buffs
        const activeBuffs = prev.activeBuffs.filter(b => b.expiresAt > now);

        // 2. Passive Energy recovery (1 point every 30 seconds, up to maxEnergy)
        const energyRegen = prev.energy < prev.maxHp ? Math.min(prev.maxEnergy, prev.energy + 1) : prev.energy;

        return {
          ...prev,
          activeBuffs,
          energy: energyRegen
        };
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Rest Timer Countdown Interval
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isResting && restTimerSeconds > 0) {
      timer = setInterval(() => {
        setRestTimerSeconds(prev => {
          if (prev <= 1) {
            soundFx.playTimerBeep(true);
            setIsResting(false);
            return 0;
          }
          if (prev <= 4) {
            soundFx.playTimerBeep(false);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isResting, restTimerSeconds]);

  // Exercise Static Countdown Timer Interval
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      timer = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            soundFx.playTimerBeep(true);
            setIsTimerRunning(false);
            // Auto complete set when timer runs out
            finishCurrentSet();
            return 0;
          }
          if (prev <= 4) {
            soundFx.playTimerBeep(false);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, timerSeconds]);

  // Floating notice animator
  const showFloatingNotice = useCallback((text: string, color = '#00f0ff', x = window.innerWidth / 2, y = window.innerHeight / 2) => {
    const id = `${Date.now()}_${Math.random()}`;
    setFloatingTexts(prev => [...prev.slice(-8), { id, text, color, x, y }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(item => item.id !== id));
    }, 1200);
  }, []);

  const triggerHaptic = useCallback(() => {
    if (state.settings.hapticsEnabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch {}
    }
  }, [state.settings.hapticsEnabled]);

  // Derived Title & Level stats
  const xpToNextLevel = getXpRequiredForLevel(state.level);

  const currentTitleObj = [...LEVEL_TITLES].reverse().find(t => state.level >= t.minLevel) || LEVEL_TITLES[0];
  const currentTitle = currentTitleObj.title;
  const currentTitleColor = currentTitleObj.color;

  // Active XP & Credit Multipliers from buffs
  const xpMultiplier = state.activeBuffs
    .filter(b => b.type === 'xp')
    .reduce((acc, b) => acc * b.multiplier, 1.0);

  const creditMultiplier = state.activeBuffs
    .filter(b => b.type === 'credits')
    .reduce((acc, b) => acc * b.multiplier, 1.0);

  // Active day's exercise list
  const currentWorkoutDay = WORKOUT_DAYS.find(d => d.id === selectedDayId) || WORKOUT_DAYS[0];
  const currentExercises = currentWorkoutDay.exerciseIds
    .map(id => ALL_EXERCISES.find(e => e.id === id))
    .filter((e): e is typeof ALL_EXERCISES[0] => !!e);
  const currentExercise = currentExercises[activeExerciseIndex] || currentExercises[0];

  // Helper to sync sets/reps when active exercise changes
  const syncExerciseTargets = useCallback((exIndex: number) => {
    const ex = currentExercises[exIndex];
    if (ex) {
      setTargetSets(ex.defaultSets);
      setTargetReps(ex.defaultReps);
      setCurrentSet(1);
      setCurrentReps(0);
      setTimerSeconds(ex.defaultDurationSec || 30);
      setIsTimerRunning(false);
      setIsResting(false);
    }
  }, [currentExercises]);

  // Start workout routine
  const startWorkout = useCallback((dayId?: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun') => {
    const targetDay = dayId || selectedDayId;
    setSelectedDayId(targetDay);
    setActiveExerciseIndex(0);
    setIsWorkoutSessionActive(true);
    syncExerciseTargets(0);
    showFloatingNotice('СЕССИЯ АКТИВИРОВАНА', '#ff007f');
    soundFx.playRepClick();
  }, [selectedDayId, syncExerciseTargets, showFloatingNotice]);

  // Central Clicker Repetition Log
  const logRepetition = useCallback((exerciseId: string) => {
    const ex = ALL_EXERCISES.find(e => e.id === exerciseId) || currentExercise;
    if (!ex) return;

    triggerHaptic();
    soundFx.playRepClick();

    const earnedXp = Math.round(ex.rewards.xp * xpMultiplier);
    const earnedCredits = Math.round(ex.rewards.credits * creditMultiplier);
    const statEarned = ex.rewards.statType;

    showFloatingNotice(`+${earnedXp} XP  +${earnedCredits} ₢`, '#00f0ff');

    setCurrentReps(prev => {
      const nextReps = prev + 1;
      // If user hit target reps, prompt for set finish
      if (nextReps >= targetReps && targetReps > 0) {
        showFloatingNotice('ПОДХОД ЗАВЕРШЁН!', '#ffe600');
      }
      return nextReps;
    });

    setState(prev => {
      let newXp = prev.xp + earnedXp;
      let newLevel = prev.level;
      let newStatPoints = prev.unallocatedStatPoints;
      let leveledUp = false;

      // Check level-up threshold
      let reqXp = getXpRequiredForLevel(newLevel);
      while (newXp >= reqXp) {
        newXp -= reqXp;
        newLevel += 1;
        newStatPoints += 3;
        leveledUp = true;
        reqXp = getXpRequiredForLevel(newLevel);
      }

      if (leveledUp) {
        soundFx.playLevelUp();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff007f', '#00f0ff', '#ffe600', '#b026ff']
        });
        setLevelUpData({
          oldLevel: prev.level,
          newLevel,
          statPointsGained: (newLevel - prev.level) * 3
        });
        setIsLevelUpModalOpen(true);
      }

      // Progress daily quests
      const updatedQuests = prev.dailyQuests.map(q => {
        if (q.id === 'quest_reps_clicker' && !q.completed) {
          const nextProg = q.currentProgress + 1;
          return { ...q, currentProgress: nextProg, completed: nextProg >= q.target };
        }
        return q;
      });

      // Progress achievements
      const updatedAchievements = prev.achievements.map(a => {
        if (a.id === 'first_rep' && !a.unlocked) {
          return { ...a, currentProgress: 1, unlocked: true };
        }
        if ((a.id === 'reps_100' || a.id === 'reps_500') && !a.unlocked) {
          const nextProg = prev.totalRepsLogged + 1;
          const unlocked = nextProg >= a.maxProgress;
          if (unlocked) soundFx.playAchievementChime();
          return { ...a, currentProgress: nextProg, unlocked };
        }
        return a;
      });

      // Increment stats slightly from repetition
      const updatedStats = {
        ...prev.stats,
        [statEarned]: Number((prev.stats[statEarned] + 0.05).toFixed(2))
      };

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        credits: prev.credits + earnedCredits,
        unallocatedStatPoints: newStatPoints,
        totalRepsLogged: prev.totalRepsLogged + 1,
        stats: updatedStats,
        dailyQuests: updatedQuests,
        achievements: updatedAchievements
      };
    });
  }, [currentExercise, xpMultiplier, creditMultiplier, targetReps, triggerHaptic, showFloatingNotice]);

  // Finish current set and trigger rest timer
  const finishCurrentSet = useCallback(() => {
    soundFx.playCoin();
    triggerHaptic();

    if (currentSet < targetSets) {
      // Advance to next set & enter rest period
      setCurrentSet(prev => prev + 1);
      setCurrentReps(0);
      const restDuration = currentExercise?.restSec || state.settings.defaultRestSec;
      setRestTimerSeconds(restDuration);
      setIsResting(true);
      showFloatingNotice(`ОТДЫХ: ${restDuration}с`, '#ffe600');
    } else {
      // Completed all sets for this exercise
      showFloatingNotice('УПРАЖНЕНИЕ ВЫПОЛНЕНО!', '#00ff66');
      if (activeExerciseIndex < currentExercises.length - 1) {
        nextExercise();
      } else {
        finishWorkoutSession();
      }
    }
  }, [currentSet, targetSets, currentExercise, state.settings.defaultRestSec, activeExerciseIndex, currentExercises.length, triggerHaptic, showFloatingNotice]);

  const skipRestTimer = useCallback(() => {
    setIsResting(false);
    setRestTimerSeconds(0);
    soundFx.playTimerBeep(true);
  }, []);

  const nextExercise = useCallback(() => {
    if (activeExerciseIndex < currentExercises.length - 1) {
      const nextIdx = activeExerciseIndex + 1;
      setActiveExerciseIndex(nextIdx);
      syncExerciseTargets(nextIdx);
    }
  }, [activeExerciseIndex, currentExercises.length, syncExerciseTargets]);

  const prevExercise = useCallback(() => {
    if (activeExerciseIndex > 0) {
      const prevIdx = activeExerciseIndex - 1;
      setActiveExerciseIndex(prevIdx);
      syncExerciseTargets(prevIdx);
    }
  }, [activeExerciseIndex, syncExerciseTargets]);

  const toggleExerciseTimer = useCallback(() => {
    setIsTimerRunning(prev => {
      const next = !prev;
      if (next) soundFx.playRepClick();
      return next;
    });
  }, []);

  // Complete workout session
  const finishWorkoutSession = useCallback(() => {
    setIsWorkoutSessionActive(false);
    setIsResting(false);
    setIsTimerRunning(false);

    const bonusXp = 150;
    const bonusCredits = 100;
    const bonusTokens = 2;

    soundFx.playLevelUp();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#ff007f', '#00f0ff', '#ffe600', '#b026ff']
    });

    showFloatingNotice(`ТРЕНИРОВКА ЗАВЕРШЕНА! +${bonusXp} XP +${bonusCredits} ₢ +${bonusTokens} 💎`, '#00ff66');

    setState(prev => {
      let newXp = prev.xp + bonusXp;
      let newLevel = prev.level;
      let newStatPoints = prev.unallocatedStatPoints;
      let leveledUp = false;

      let reqXp = getXpRequiredForLevel(newLevel);
      while (newXp >= reqXp) {
        newXp -= reqXp;
        newLevel += 1;
        newStatPoints += 3;
        leveledUp = true;
        reqXp = getXpRequiredForLevel(newLevel);
      }

      if (leveledUp) {
        setLevelUpData({
          oldLevel: prev.level,
          newLevel,
          statPointsGained: (newLevel - prev.level) * 3
        });
        setIsLevelUpModalOpen(true);
      }

      // Mark today's workout in attendance
      const today = new Date().toISOString().slice(0, 10);
      const existingRecord = prev.attendance.find(a => a.date === today);
      let updatedAttendance = prev.attendance;
      if (existingRecord) {
        updatedAttendance = prev.attendance.map(a => a.date === today ? { ...a, workoutCompleted: true } : a);
      } else {
        updatedAttendance = [...prev.attendance, { date: today, checkedIn: true, workoutCompleted: true, dayName: selectedDayId }];
      }

      // Update quests
      const updatedQuests = prev.dailyQuests.map(q => {
        if (q.id === 'quest_workout_session') {
          return { ...q, currentProgress: q.target, completed: true };
        }
        return q;
      });

      // Update achievements
      const updatedAchievements = prev.achievements.map(a => {
        if (a.id === 'workout_first_day' && !a.unlocked) {
          return { ...a, currentProgress: 1, unlocked: true };
        }
        return a;
      });

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        credits: prev.credits + bonusCredits,
        tokens: prev.tokens + bonusTokens,
        unallocatedStatPoints: newStatPoints,
        totalWorkoutsCompleted: prev.totalWorkoutsCompleted + 1,
        attendance: updatedAttendance,
        dailyQuests: updatedQuests,
        achievements: updatedAchievements
      };
    });
  }, [selectedDayId, showFloatingNotice]);

  const cancelWorkoutSession = useCallback(() => {
    setIsWorkoutSessionActive(false);
    setIsResting(false);
    setIsTimerRunning(false);
  }, []);

  // Spend Stat Point
  const allocateStatPoint = useCallback((stat: StatType) => {
    setState(prev => {
      if (prev.unallocatedStatPoints <= 0) return prev;
      soundFx.playCoin();
      showFloatingNotice(`+1 ${stat.toUpperCase()}`, '#00f0ff');
      return {
        ...prev,
        unallocatedStatPoints: prev.unallocatedStatPoints - 1,
        stats: {
          ...prev.stats,
          [stat]: prev.stats[stat] + 1
        }
      };
    });
  }, [showFloatingNotice]);

  const closeLevelUpModal = useCallback(() => {
    setIsLevelUpModalOpen(false);
    setLevelUpData(null);
  }, []);

  // Shop purchase & equip
  const buyShopItem = useCallback((itemId: string): boolean => {
    let success = false;
    setState(prev => {
      const item = prev.shopItems.find(i => i.id === itemId);
      if (!item || item.unlocked) return prev;

      if (prev.credits < item.priceCredits || prev.tokens < item.priceTokens) {
        showFloatingNotice('НЕДОСТАТОЧНО СРЕДСТВ', '#ff0055');
        return prev;
      }

      success = true;
      soundFx.playCoin();
      showFloatingNotice(`КУПЛЕНО: ${item.name}`, '#00ff66');

      let newBuffs = [...prev.activeBuffs];
      if (item.category === 'buff' && item.buffData) {
        const buffDurationMs = item.buffData.durationMinutes * 60 * 1000;
        newBuffs = newBuffs.filter(b => b.id !== item.id);
        newBuffs.push({
          id: item.id,
          name: item.name,
          icon: item.icon,
          type: item.buffData.type,
          multiplier: item.buffData.multiplier,
          durationMinutes: item.buffData.durationMinutes,
          expiresAt: Date.now() + buffDurationMs,
          description: item.description
        });
      }

      return {
        ...prev,
        credits: prev.credits - item.priceCredits,
        tokens: prev.tokens - item.priceTokens,
        shopItems: prev.shopItems.map(i => i.id === itemId ? { ...i, unlocked: true } : i),
        activeBuffs: newBuffs
      };
    });
    return success;
  }, [showFloatingNotice]);

  const equipShopItem = useCallback((itemId: string) => {
    setState(prev => {
      const item = prev.shopItems.find(i => i.id === itemId);
      if (!item || !item.unlocked) return prev;

      soundFx.playRepClick();
      showFloatingNotice(`ЭКИПИРОВАНО: ${item.name}`, '#00f0ff');

      if (item.category === 'skin') {
        return { ...prev, equippedSkin: item.id };
      }
      if (item.category === 'aura') {
        return { ...prev, equippedAura: item.id };
      }
      if (item.category === 'theme') {
        const themeMap: Record<string, typeof prev.settings.theme> = {
          theme_blood_dragon: 'blood-dragon',
          theme_miami_vice: 'miami-vice',
          theme_matrix: 'matrix',
          theme_outrun: 'outrun'
        };
        const newTheme = themeMap[item.id] || 'blood-dragon';
        return {
          ...prev,
          equippedTheme: item.id,
          settings: { ...prev.settings, theme: newTheme }
        };
      }
      if (item.category === 'accessory') {
        const isEquipped = prev.equippedAccessories.includes(item.id);
        const nextAcc = isEquipped
          ? prev.equippedAccessories.filter(id => id !== item.id)
          : [...prev.equippedAccessories, item.id];
        return { ...prev, equippedAccessories: nextAcc };
      }
      return prev;
    });
  }, [showFloatingNotice]);

  // Attendance checkin
  const claimDailyAttendance = useCallback((): boolean => {
    const today = new Date().toISOString().slice(0, 10);
    let success = false;
    setState(prev => {
      if (prev.lastCheckinDate === today) {
        showFloatingNotice('УЖЕ ОТМЕЧЕНО СЕГОДНЯ', '#ffe600');
        return prev;
      }

      success = true;
      const nextStreak = prev.currentStreak + 1;
      const rewardCredits = 40 + nextStreak * 5;
      const rewardXp = 50 + nextStreak * 10;
      let rewardTokens = 0;

      // Special milestone bonuses for 3, 7, 14, 30 days
      if (nextStreak === 3) rewardTokens = 2;
      if (nextStreak === 7) rewardTokens = 5;
      if (nextStreak === 14) rewardTokens = 10;
      if (nextStreak === 30) rewardTokens = 25;

      soundFx.playLevelUp();
      showFloatingNotice(`СЕРИЯ ДНЕЙ: ${nextStreak}! +${rewardXp} XP +${rewardCredits} ₢ ${rewardTokens ? `+${rewardTokens} 💎` : ''}`, '#00ff66');

      const existingRecord = prev.attendance.find(a => a.date === today);
      const updatedAttendance = existingRecord
        ? prev.attendance.map(a => a.date === today ? { ...a, checkedIn: true } : a)
        : [...prev.attendance, { date: today, checkedIn: true, workoutCompleted: false, dayName: 'Check-in' }];

      // Progress checkin quests & streak achievements
      const updatedQuests = prev.dailyQuests.map(q => q.id === 'quest_checkin' ? { ...q, currentProgress: 1, completed: true } : q);
      const updatedAchievements = prev.achievements.map(a => {
        if (a.id === 'streak_3' && nextStreak >= 3) return { ...a, currentProgress: 3, unlocked: true };
        if (a.id === 'streak_7' && nextStreak >= 7) return { ...a, currentProgress: 7, unlocked: true };
        if (a.id === 'streak_14' && nextStreak >= 14) return { ...a, currentProgress: 14, unlocked: true };
        if (a.id === 'streak_30' && nextStreak >= 30) return { ...a, currentProgress: 30, unlocked: true };
        return a;
      });

      return {
        ...prev,
        lastCheckinDate: today,
        currentStreak: nextStreak,
        credits: prev.credits + rewardCredits,
        xp: prev.xp + rewardXp,
        tokens: prev.tokens + rewardTokens,
        attendance: updatedAttendance,
        dailyQuests: updatedQuests,
        achievements: updatedAchievements
      };
    });
    return success;
  }, [showFloatingNotice]);

  // Claim Daily Quest Reward
  const claimQuestReward = useCallback((questId: string) => {
    setState(prev => {
      const quest = prev.dailyQuests.find(q => q.id === questId);
      if (!quest || !quest.completed || quest.claimed) return prev;

      soundFx.playCoin();
      showFloatingNotice(`НАГРАДА: +${quest.rewardXp} XP +${quest.rewardCredits} ₢`, '#00ff66');

      return {
        ...prev,
        xp: prev.xp + quest.rewardXp,
        credits: prev.credits + quest.rewardCredits,
        dailyQuests: prev.dailyQuests.map(q => q.id === questId ? { ...q, claimed: true } : q)
      };
    });
  }, [showFloatingNotice]);

  // Claim Achievement Reward
  const claimAchievementReward = useCallback((achievementId: string) => {
    setState(prev => {
      const a = prev.achievements.find(item => item.id === achievementId);
      if (!a || !a.unlocked) return prev;

      soundFx.playAchievementChime();
      showFloatingNotice(`ДОСТИЖЕНИЕ: +${a.rewardCredits} ₢ +${a.rewardTokens} 💎`, '#ffe600');

      return {
        ...prev,
        credits: prev.credits + a.rewardCredits,
        tokens: prev.tokens + a.rewardTokens,
        achievements: prev.achievements.map(item => item.id === achievementId ? { ...item, rewardCredits: 0, rewardTokens: 0 } : item)
      };
    });
  }, [showFloatingNotice]);

  // Custom Avatar and Exercise Media
  const setCustomAvatar = useCallback((dataUrl: string | null) => {
    setState(prev => ({ ...prev, customAvatarUrl: dataUrl }));
  }, []);

  const setExerciseCustomImage = useCallback((exerciseId: string, dataUrl: string) => {
    setState(prev => ({
      ...prev,
      exerciseCustomImages: {
        ...prev.exerciseCustomImages,
        [exerciseId]: dataUrl
      }
    }));
    showFloatingNotice('ИЗОБРАЖЕНИЕ СОХРАНЕНО ЛОКАЛЬНО', '#00ff66');
  }, [showFloatingNotice]);

  const removeExerciseCustomImage = useCallback((exerciseId: string) => {
    setState(prev => {
      const nextMap = { ...prev.exerciseCustomImages };
      delete nextMap[exerciseId];
      return { ...prev, exerciseCustomImages: nextMap };
    });
  }, []);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  }, []);

  // Developer Mode Controls
  const unlockDevMode = useCallback(() => {
    setState(prev => ({ ...prev, devModeUnlocked: true }));
    soundFx.playAchievementChime();
    showFloatingNotice('РЕЖИМ РАЗРАБОТЧИКА АКТИВИРОВАН', '#ff007f');
  }, [showFloatingNotice]);

  const devUpdateStat = useCallback((stat: StatType, val: number) => {
    setState(prev => ({
      ...prev,
      stats: { ...prev.stats, [stat]: Math.max(1, Math.round(val)) }
    }));
  }, []);

  const devAddCurrency = useCallback((credits: number, tokens: number) => {
    setState(prev => ({
      ...prev,
      credits: Math.max(0, prev.credits + credits),
      tokens: Math.max(0, prev.tokens + tokens)
    }));
    soundFx.playCoin();
  }, []);

  const devSetLevel = useCallback((level: number) => {
    setState(prev => ({
      ...prev,
      level: Math.max(1, level),
      xp: 0
    }));
  }, []);

  const devUnlockAll = useCallback(() => {
    setState(prev => ({
      ...prev,
      shopItems: prev.shopItems.map(i => ({ ...i, unlocked: true })),
      achievements: prev.achievements.map(a => ({ ...a, unlocked: true, currentProgress: a.maxProgress }))
    }));
    soundFx.playAchievementChime();
    showFloatingNotice('ВСЕ РАЗБЛОКИРОВАНО', '#00ff66');
  }, [showFloatingNotice]);

  const devResetProgress = useCallback(() => {
    startTransition(() => {
      localStorage.removeItem('neon_fitness_rpg_state_v1');
      setState(loadGameState());
      showFloatingNotice('ПРОГРЕСС СБРОШЕН', '#ff0055');
    });
  }, [showFloatingNotice]);

  const exportData = useCallback(() => {
    exportBackupJson(state);
    showFloatingNotice('БЭКАП ЭКСПОРТИРОВАН', '#00ff66');
  }, [state, showFloatingNotice]);

  const importData = useCallback((jsonStr: string): boolean => {
    const imported = importBackupJson(jsonStr);
    if (imported) {
      setState(imported);
      showFloatingNotice('БЭКАП УСПЕШНО ВОССТАНОВЛЕН', '#00ff66');
      return true;
    } else {
      showFloatingNotice('ОШИБКА ИМПОРТА', '#ff0055');
      return false;
    }
  }, [showFloatingNotice]);

  return (
    <GameContext.Provider
      value={{
        state,
        xpToNextLevel,
        currentTitle,
        currentTitleColor,
        floatingTexts,
        isLevelUpModalOpen,
        levelUpData,
        selectedDayId,
        activeExerciseIndex,
        currentSet,
        targetSets,
        currentReps,
        targetReps,
        isResting,
        restTimerSeconds,
        isTimerRunning,
        timerSeconds,
        isWorkoutSessionActive,
        setSelectedDayId,
        startWorkout,
        logRepetition,
        finishCurrentSet,
        skipRestTimer,
        nextExercise,
        prevExercise,
        toggleExerciseTimer,
        finishWorkoutSession,
        cancelWorkoutSession,
        allocateStatPoint,
        closeLevelUpModal,
        buyShopItem,
        equipShopItem,
        claimDailyAttendance,
        claimQuestReward,
        claimAchievementReward,
        setCustomAvatar,
        setExerciseCustomImage,
        removeExerciseCustomImage,
        updateSettings,
        unlockDevMode,
        devUpdateStat,
        devAddCurrency,
        devSetLevel,
        devUnlockAll,
        devResetProgress,
        exportData,
        importData,
        triggerHaptic,
        showFloatingNotice
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
