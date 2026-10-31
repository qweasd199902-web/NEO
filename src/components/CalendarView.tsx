import React from 'react';
import { useGame } from '../context/GameContext';
import { Calendar as CalendarIcon, CheckCircle2, Dumbbell, Award, Flame } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { state, claimDailyAttendance } = useGame();

  // Generate 30 days matrix
  const days30 = Array.from({ length: 30 }, (_, i) => i + 1);

  // Check which days were completed in streak
  const streak = state.currentStreak;

  const milestones = [
    { days: 3, reward: '100 ₢ + 2 💎', title: 'Инициатор', unlocked: streak >= 3 },
    { days: 7, reward: '300 ₢ + 5 💎', title: 'Синхронизированный', unlocked: streak >= 7 },
    { days: 14, reward: '700 ₢ + 10 💎', title: 'Стальной Характер', unlocked: streak >= 14 },
    { days: 30, reward: '1500 ₢ + 25 💎', title: 'Бессмертный', unlocked: streak >= 30 }
  ];

  const todayStr = new Date().toISOString().slice(0, 10);
  const isCheckedInToday = state.lastCheckinDate === todayStr;

  return (
    <div className="space-y-6 pb-24">
      {/* Calendar Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#17052e] via-[#20083a] to-[#0c031a] border border-pink-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(255,0,127,0.2)]">
        <div>
          <h1 className="font-orbitron font-black text-xl text-white flex items-center gap-2">
            <CalendarIcon size={22} className="text-pink-500" />
            <span>30-ДНЕВНЫЙ КИБЕР-КАЛЕНДАРЬ</span>
          </h1>
          <p className="font-mono text-xs text-gray-400">
            Фиксация дисциплины и нейро-активности организма.
          </p>
        </div>

        {!isCheckedInToday && (
          <button
            onClick={claimDailyAttendance}
            className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold shadow-[0_0_12px_#ff007f] transition-all"
          >
            Отметиться сегодня
          </button>
        )}
      </div>

      {/* 30 DAYS GRID */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-purple-500/30 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400">
          <span>Сетка посещений (текущая серия: <strong className="text-pink-400">{streak}</strong> дн.)</span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Визит
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" /> Тренировка
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
          {days30.map(dayNum => {
            const isCompletedInStreak = dayNum <= streak;
            const isCurrentDay = dayNum === streak + 1;
            const isMilestone = [3, 7, 14, 30].includes(dayNum);

            return (
              <div
                key={dayNum}
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-1 font-mono text-xs transition-all relative ${
                  isCompletedInStreak
                    ? 'bg-gradient-to-tr from-purple-950 to-pink-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.4)]'
                    : isCurrentDay
                    ? 'bg-black/60 border-yellow-400 text-yellow-300 animate-pulse'
                    : 'bg-black/30 border-gray-800 text-gray-600'
                }`}
              >
                {isMilestone && (
                  <span className="absolute -top-1 -right-1 text-[10px]">⭐</span>
                )}
                <span className="font-orbitron font-bold text-xs">{dayNum}</span>
                {isCompletedInStreak && (
                  <CheckCircle2 size={12} className="text-cyan-400 mt-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MILESTONE REWARDS */}
      <div className="space-y-3">
        <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
          <Award size={18} className="text-yellow-400" />
          <span>НАГРАДЫ ЗА СЕРИЮ ПОСЕЩЕНИЙ</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {milestones.map(m => (
            <div
              key={m.days}
              className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 font-mono text-xs transition-all ${
                m.unlocked
                  ? 'bg-emerald-950/30 border-emerald-400/50 text-emerald-300 shadow-[0_0_10px_rgba(0,255,102,0.15)]'
                  : 'bg-black/40 border-purple-500/20 text-gray-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-orbitron font-bold text-white text-xs">
                  {m.days} ДНЕЙ
                </span>
                {m.unlocked ? (
                  <CheckCircle2 size={14} className="text-emerald-400" />
                ) : (
                  <span className="text-[10px] text-gray-500">ЗАБЛОКИРОВАНО</span>
                )}
              </div>
              <div className="text-yellow-400 font-bold">{m.reward}</div>
              <div className="text-[10px] text-gray-400">Титул: {m.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WORKOUT LIFETIME HISTORY METRICS */}
      <div className="p-4 rounded-xl bg-black/40 border border-purple-500/20 font-mono text-xs flex flex-wrap items-center justify-around gap-4 text-center">
        <div>
          <div className="text-gray-400 text-[11px]">ВСЕГО ТРЕНИРОВОК</div>
          <div className="font-orbitron font-bold text-lg text-white">
            {state.totalWorkoutsCompleted}
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-[11px]">ВЫПОЛНЕНО ПОВТОРЕНИЙ</div>
          <div className="font-orbitron font-bold text-lg text-pink-400">
            {state.totalRepsLogged}
          </div>
        </div>
        <div>
          <div className="text-gray-400 text-[11px]">ДНЕЙ В НЕЙРОСЕТИ</div>
          <div className="font-orbitron font-bold text-lg text-cyan-400">
            {state.attendance.length}
          </div>
        </div>
      </div>
    </div>
  );
};
