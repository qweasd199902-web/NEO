import React from 'react';
import { useGame } from '../context/GameContext';
import { CheckSquare, Award, CheckCircle2, Flame, Sparkles } from 'lucide-react';

export const DailyView: React.FC = () => {
  const { state, claimDailyAttendance, claimQuestReward } = useGame();

  const todayStr = new Date().toISOString().slice(0, 10);
  const isCheckedInToday = state.lastCheckinDate === todayStr;

  return (
    <div className="space-y-6 pb-24">
      {/* DAILY ATTENDANCE HERO */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1d0635] via-[#24083a] to-[#0d031c] border border-pink-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_25px_rgba(255,0,127,0.2)]">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-pink-400 font-mono text-xs font-bold">
            <Flame size={15} />
            <span>НЕПРЕРЫВНАЯ СЕРИЯ ВИЗИТОВ</span>
          </div>
          <h1 className="font-orbitron font-black text-2xl text-white">
            {state.currentStreak} ДНЕЙ ПОДРЯД
          </h1>
          <p className="font-mono text-xs text-gray-300 max-w-md">
            Отмечайте визит даже в дни отдыха. Серия не сбрасывается из-за дней восстановления!
          </p>
        </div>

        <div>
          {!isCheckedInToday ? (
            <button
              onClick={claimDailyAttendance}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 text-white font-orbitron font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(255,0,127,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Award size={18} />
              <span>ОТМЕТИТЬСЯ СЕГОДНЯ</span>
            </button>
          ) : (
            <div className="px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-400 text-emerald-300 font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_10px_#00ff66]">
              <CheckCircle2 size={16} />
              <span>СЕГОДНЯШНИЙ БОНУС ПОЛУЧЕН</span>
            </div>
          )}
        </div>
      </div>

      {/* DAILY QUESTS LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
            <CheckSquare size={18} className="text-cyan-400" />
            <span>ЕЖЕДНЕВНЫЕ ЗАДАНИЯ</span>
          </h2>
          <span className="font-mono text-xs text-gray-400">
            Обновляются каждые 24 часа
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {state.dailyQuests.map(quest => {
            const progressPercent = Math.min(100, Math.floor((quest.currentProgress / quest.target) * 100));
            const canClaim = quest.completed && !quest.claimed;

            return (
              <div
                key={quest.id}
                className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
                  quest.claimed
                    ? 'bg-black/30 border-gray-800 opacity-60'
                    : quest.completed
                    ? 'bg-emerald-950/30 border-emerald-400/50 shadow-[0_0_12px_rgba(0,255,102,0.2)]'
                    : 'bg-black/40 border-purple-500/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-orbitron font-bold text-xs text-white">
                      {quest.title}
                    </span>
                    <span className="font-mono text-[11px] text-gray-400">
                      {quest.currentProgress} / {quest.target}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-gray-300">
                    {quest.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-purple-500/20">
                  <div
                    className="h-full bg-gradient-to-r from-pink-600 to-cyan-400 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Rewards & Claim */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-bold">+{quest.rewardCredits} ₢</span>
                    <span className="text-cyan-400 font-bold">+{quest.rewardXp} XP</span>
                  </div>

                  <div>
                    {quest.claimed ? (
                      <span className="text-gray-500 text-[11px] flex items-center gap-1">
                        <CheckCircle2 size={13} /> ПОЛУЧЕНО
                      </span>
                    ) : canClaim ? (
                      <button
                        onClick={() => claimQuestReward(quest.id)}
                        className="px-3 py-1 rounded bg-emerald-400 text-black font-orbitron font-bold text-[10px] hover:bg-emerald-300 shadow-[0_0_8px_#00ff66] transition-all"
                      >
                        ЗАБРАТЬ
                      </button>
                    ) : (
                      <span className="text-gray-500 text-[11px]">В ПРОЦЕССЕ</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
