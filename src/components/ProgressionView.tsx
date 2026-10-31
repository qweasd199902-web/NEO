import React from 'react';
import { useGame } from '../context/GameContext';
import { TRAINING_STAGES_INFO } from '../data/exercisesData';
import { LEVEL_TITLES } from '../data/rpgData';
import { Trophy, Award, CheckCircle2, Lock, Sparkles, ChevronRight } from 'lucide-react';

export const ProgressionView: React.FC = () => {
  const { state, claimAchievementReward, updateSettings } = useGame();

  const handleSelectStage = (stageNum: 1 | 2 | 3 | 4) => {
    updateSettings({ currentStage: stageNum });
  };

  return (
    <div className="space-y-6 pb-24">
      {/* 4 TRAINING STAGES ROADMAP */}
      <div className="space-y-3">
        <div>
          <h2 className="font-orbitron font-bold text-lg text-white flex items-center gap-2">
            <Sparkles size={18} className="text-pink-500" />
            <span>4 ЭТАПА ТРЕНИРОВОЧНОГО РАЗВИТИЯ</span>
          </h2>
          <p className="font-mono text-xs text-gray-400">
            Последовательная прогрессия без риска травм и перегрузок.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {TRAINING_STAGES_INFO.map(s => {
            const isActive = state.settings.currentStage === s.stage;
            return (
              <div
                key={s.stage}
                onClick={() => handleSelectStage(s.stage as 1 | 2 | 3 | 4)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-950/80 to-purple-950/80 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                    : 'bg-black/50 border-purple-500/20 hover:border-pink-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-orbitron font-black text-xs px-2 py-0.5 rounded bg-pink-600 text-white">
                      ЭТАП {s.stage}
                    </span>
                    <span className="font-mono text-xs text-cyan-300 font-bold">
                      {s.duration}
                    </span>
                  </div>
                  {isActive && (
                    <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 text-[10px] font-mono font-bold">
                      АКТИВЕН
                    </span>
                  )}
                </div>

                <div className="font-orbitron font-bold text-sm text-white mb-1">
                  {s.name}
                </div>
                <p className="font-mono text-xs text-gray-300 leading-relaxed mb-3">
                  {s.description}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 border-t border-white/5 pt-2">
                  <span>Множитель объёма: {s.repsMultiplier}x</span>
                  <span>Отдых: {s.restMultiplier}x</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TITLES TIER LIST */}
      <div className="p-4 rounded-xl bg-black/40 border border-purple-500/30 space-y-3">
        <h3 className="font-orbitron font-bold text-sm text-white flex items-center gap-2">
          <Award size={16} className="text-yellow-400" />
          <span>КИБЕР-ЗВАНИЯ И ТИТУЛЫ</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {LEVEL_TITLES.map(titleObj => {
            const isUnlocked = state.level >= titleObj.minLevel;
            return (
              <div
                key={titleObj.minLevel}
                className={`p-2.5 rounded-lg border text-xs font-mono transition-all ${
                  isUnlocked
                    ? 'bg-black/70 border-pink-500/40 shadow-[0_0_8px_rgba(255,0,127,0.2)]'
                    : 'bg-black/20 border-gray-800 text-gray-600 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span>LVL {titleObj.minLevel}+</span>
                  {isUnlocked ? (
                    <CheckCircle2 size={12} className="text-emerald-400" />
                  ) : (
                    <Lock size={12} className="text-gray-600" />
                  )}
                </div>
                <div className="font-bold truncate" style={{ color: isUnlocked ? titleObj.color : '#6b7280' }}>
                  {titleObj.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACHIEVEMENTS LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
            <Trophy size={18} className="text-yellow-400" />
            <span>ДОСТИЖЕНИЯ И ТРОФЕИ</span>
          </h2>
          <span className="font-mono text-xs text-gray-400">
            {state.achievements.filter(a => a.unlocked).length} / {state.achievements.length} открыто
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {state.achievements.map(a => {
            const hasUnclaimed = a.unlocked && (a.rewardCredits > 0 || a.rewardTokens > 0);
            const progressPercent = Math.min(100, Math.floor((a.currentProgress / a.maxProgress) * 100));

            return (
              <div
                key={a.id}
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
                  a.unlocked
                    ? 'bg-gradient-to-r from-purple-950/40 to-pink-950/30 border-yellow-400/50 shadow-[0_0_12px_rgba(255,230,0,0.15)]'
                    : 'bg-black/40 border-purple-500/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/60 border border-yellow-500/40 flex items-center justify-center text-xl shrink-0">
                    {a.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-orbitron font-bold text-xs text-white">
                        {a.title}
                      </span>
                      {a.unlocked ? (
                        <span className="text-[10px] font-mono text-yellow-400 font-bold flex items-center gap-1">
                          <CheckCircle2 size={12} /> ВЫПОЛНЕНО
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-gray-400">
                          {a.currentProgress} / {a.maxProgress}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-mono text-gray-300 mt-0.5">
                      {a.description}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                {!a.unlocked && (
                  <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-purple-500/20">
                    <div
                      className="h-full bg-gradient-to-r from-pink-600 to-cyan-400 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}

                {/* Rewards & Claim Button */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    {a.rewardCredits > 0 && (
                      <span className="text-yellow-400 font-bold">+{a.rewardCredits} ₢</span>
                    )}
                    {a.rewardTokens > 0 && (
                      <span className="text-cyan-400 font-bold">+{a.rewardTokens} 💎</span>
                    )}
                    {a.rewardTitle && (
                      <span className="text-pink-400 text-[10px]">[{a.rewardTitle}]</span>
                    )}
                  </div>

                  {hasUnclaimed && (
                    <button
                      onClick={() => claimAchievementReward(a.id)}
                      className="px-3 py-1 rounded bg-yellow-400 text-black font-orbitron font-bold text-[10px] hover:bg-yellow-300 shadow-[0_0_8px_#ffe600] active:scale-95 transition-all"
                    >
                      ЗАБРАТЬ НАГРАДУ
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
