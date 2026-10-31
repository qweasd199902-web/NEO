import React from 'react';
import { useGame } from '../context/GameContext';
import { AvatarDisplay } from './AvatarDisplay';
import { WORKOUT_DAYS } from '../data/exercisesData';
import {
  Play,
  TrendingUp,
  ShoppingBag,
  Music,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Award,
  Flame,
  Clock,
  Sparkles
} from 'lucide-react';
import { NavTabId } from './Navigation';

interface Props {
  onNavigate: (tab: NavTabId) => void;
}

export const HomeView: React.FC<Props> = ({ onNavigate }) => {
  const { state, startWorkout, claimDailyAttendance } = useGame();

  // Find today's real day of week (0 = Sunday, 1 = Monday...)
  const dayIndex = new Date().getDay();
  const dayMap: Record<number, 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'> = {
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
    0: 'sun'
  };
  const todayId = dayMap[dayIndex] || 'mon';
  const todayWorkout = WORKOUT_DAYS.find(d => d.id === todayId) || WORKOUT_DAYS[0];

  const todayStr = new Date().toISOString().slice(0, 10);
  const attendanceToday = state.attendance.find(a => a.date === todayStr);
  const isCheckedInToday = state.lastCheckinDate === todayStr || attendanceToday?.checkedIn;
  const isWorkoutDoneToday = !!attendanceToday?.workoutCompleted;

  const handleStartTodayWorkout = () => {
    startWorkout(todayId);
    onNavigate('workout');
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Hero Cyber Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-pink-500/40 bg-gradient-to-r from-[#17052e] via-[#24083a] to-[#0d031c] p-4 sm:p-6 shadow-[0_0_25px_rgba(255,0,127,0.2)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Avatar with dynamic aura */}
          <AvatarDisplay onNavigateToCustomization={() => onNavigate('customization')} />

          {/* Today's Mission & Quick Launch */}
          <div className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/80 border border-pink-500 text-pink-300 font-mono text-xs">
              <Flame size={14} className="text-pink-400" />
              <span>ПЛАН НА СЕГОДНЯ: {todayWorkout.nameRu.toUpperCase()}</span>
            </div>

            <div>
              <h1 className="font-orbitron font-black text-xl sm:text-2xl text-white tracking-wide">
                {todayWorkout.focusRu}
              </h1>
              <p className="text-gray-300 font-mono text-xs sm:text-sm mt-1 max-w-xl">
                {todayWorkout.description}
              </p>
            </div>

            {/* Workout Details Pill */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-mono">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 border border-purple-500/40 text-purple-300">
                <Clock size={13} /> ~{todayWorkout.estDurationMin} МИН
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 border border-cyan-500/40 text-cyan-300">
                <Sparkles size={13} /> {todayWorkout.exerciseIds.length} УПРАЖНЕНИЙ
              </span>
              {isWorkoutDoneToday && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500 text-emerald-300">
                  <CheckCircle2 size={13} /> ВЫПОЛНЕНО
                </span>
              )}
            </div>

            {/* Launch Button */}
            <div className="pt-2 w-full flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleStartTodayWorkout}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 hover:from-pink-500 hover:to-cyan-400 text-white font-orbitron font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(255,0,127,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <Play size={18} className="fill-white group-hover:scale-110 transition-transform" />
                <span>НАЧАТЬ ТРЕНИРОВКУ</span>
              </button>

              {!isCheckedInToday ? (
                <button
                  onClick={claimDailyAttendance}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-black/60 hover:bg-black/80 border border-yellow-400 text-yellow-300 font-mono text-xs font-bold hover:shadow-[0_0_15px_#ffe600] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <Award size={16} />
                  <span>ОТМЕТИТЬ ПОСЕЩЕНИЕ (+XP/₢)</span>
                </button>
              ) : (
                <div className="px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>ВИЗИТ ОТМЕЧЕН ({state.currentStreak} ДН.)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cyber Actions Grid (Workout, Progression, Shop, Music, Daily) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => onNavigate('workout')}
          className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#120626] border border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,0,127,0.4)] transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-pink-600/20 border border-pink-500/50 flex items-center justify-center text-pink-400 mb-2 group-hover:scale-110 transition-transform">
            <Play size={20} />
          </div>
          <span className="font-orbitron font-bold text-xs text-white">ТРЕНИРОВКИ</span>
          <span className="font-mono text-[10px] text-gray-400 mt-0.5">7-дневный план</span>
        </button>

        <button
          onClick={() => onNavigate('character')}
          className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#120626] border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all group relative"
        >
          {state.unallocatedStatPoints > 0 && (
            <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-400 text-black font-orbitron font-black text-[9px] rounded-full shadow-[0_0_8px_#ffe600] animate-pulse">
              +{state.unallocatedStatPoints}
            </span>
          )}
          <div className="w-10 h-10 rounded-lg bg-cyan-600/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
            <TrendingUp size={20} />
          </div>
          <span className="font-orbitron font-bold text-xs text-white">ПРОКАЧКА</span>
          <span className="font-mono text-[10px] text-gray-400 mt-0.5">Характеристики</span>
        </button>

        <button
          onClick={() => onNavigate('shop')}
          className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#120626] border border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(176,38,255,0.4)] transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/50 flex items-center justify-center text-purple-400 mb-2 group-hover:scale-110 transition-transform">
            <ShoppingBag size={20} />
          </div>
          <span className="font-orbitron font-bold text-xs text-white">КИБЕР-ШОП</span>
          <span className="font-mono text-[10px] text-gray-400 mt-0.5">Скины, ауры, бафы</span>
        </button>

        <button
          onClick={() => onNavigate('music')}
          className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#120626] border border-yellow-500/40 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(255,230,0,0.4)] transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-yellow-600/20 border border-yellow-500/50 flex items-center justify-center text-yellow-400 mb-2 group-hover:scale-110 transition-transform">
            <Music size={20} />
          </div>
          <span className="font-orbitron font-bold text-xs text-white">СИНТ-ПЛЕЕР</span>
          <span className="font-mono text-[10px] text-gray-400 mt-0.5">Своя музыка & 80s</span>
        </button>
      </div>

      {/* Stats Summary & Daily Streak Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Streak & Attendance */}
        <div className="p-4 rounded-xl bg-gradient-to-b from-[#13072b] to-[#090317] border border-pink-500/30 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-pink-400 font-mono text-xs font-bold">
              <Calendar size={15} />
              <span>СЕРИЯ ДНЕЙ (STREAK)</span>
            </div>
            <div className="font-orbitron font-black text-2xl text-white">
              {state.currentStreak} <span className="text-xs font-mono text-gray-400">дней подряд</span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono">
              Отмечайтесь каждый день — награды за 3, 7, 14 и 30 дней!
            </p>
          </div>
          <button
            onClick={() => onNavigate('calendar')}
            className="px-3 py-2 rounded-lg bg-pink-600/20 border border-pink-500/60 text-pink-300 font-mono text-xs hover:bg-pink-600/40 transition-colors"
          >
            Календарь →
          </button>
        </div>

        {/* Global Progress Metrics */}
        <div className="p-4 rounded-xl bg-gradient-to-b from-[#13072b] to-[#090317] border border-cyan-500/30 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-xs font-bold">
              <Award size={15} />
              <span>БОЕВОЙ ПРОГРЕСС</span>
            </div>
            <div className="font-orbitron font-black text-2xl text-white">
              {state.totalRepsLogged} <span className="text-xs font-mono text-gray-400">повторений</span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono">
              Завершено тренировок: {state.totalWorkoutsCompleted}
            </p>
          </div>
          <button
            onClick={() => onNavigate('progression')}
            className="px-3 py-2 rounded-lg bg-cyan-600/20 border border-cyan-500/60 text-cyan-300 font-mono text-xs hover:bg-cyan-600/40 transition-colors"
          >
            Достижения →
          </button>
        </div>
      </div>

      {/* Safety & Medical Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/40 text-amber-300 font-mono text-xs flex items-start gap-2.5">
        <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-200">Медицинский протокол кибер-атлета: </span>
          Никогда не тренируйтесь через острую боль! Все упражнения программы направлены на укрепление связок, ахилловых сухожилий и суставов. Если чувствуете дискомфорт — снизьте нагрузку, сократите амплитуду или сделайте дополнительный день отдыха.
        </div>
      </div>
    </div>
  );
};
