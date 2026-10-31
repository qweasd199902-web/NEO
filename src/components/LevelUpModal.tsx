import React from 'react';
import { useGame } from '../context/GameContext';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  onNavigateToStats: () => void;
}

export const LevelUpModal: React.FC<Props> = ({ onNavigateToStats }) => {
  const { isLevelUpModalOpen, levelUpData, closeLevelUpModal, currentTitle } = useGame();

  if (!isLevelUpModalOpen || !levelUpData) return null;

  const handleClaim = () => {
    closeLevelUpModal();
    onNavigateToStats();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-[#250b44] to-[#0c041c] border-2 border-pink-500 p-6 text-center shadow-[0_0_50px_rgba(255,0,127,0.6)]">
        {/* Holographic corner glows */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 border border-yellow-400 font-orbitron font-black text-xs text-yellow-300 shadow-[0_0_15px_#ffe600] uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles size={14} /> LEVEL UPGRADE! <Sparkles size={14} />
        </div>

        <div className="mt-4 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-2 border-cyan-400 bg-black/60 flex items-center justify-center shadow-[0_0_25px_#00f0ff] mb-3">
            <span className="font-orbitron font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
              {levelUpData.newLevel}
            </span>
          </div>

          <h2 className="font-orbitron font-bold text-lg text-white mb-1">
            СИСТЕМА МОДЕРНИЗИРОВАНА
          </h2>
          <p className="font-mono text-xs text-pink-300 mb-4">
            Звание: <span className="text-cyan-300 font-bold">{currentTitle}</span>
          </p>

          <div className="w-full bg-black/60 border border-pink-500/30 rounded-lg p-3 text-left font-mono text-xs space-y-2 mb-5">
            <div className="flex items-center justify-between text-yellow-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Zap size={14} /> Очки навыков (SP):
              </span>
              <span className="font-orbitron font-bold text-sm">+{levelUpData.statPointsGained} SP</span>
            </div>
            <div className="flex items-center justify-between text-emerald-400">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck size={14} /> Здоровье & Энергия:
              </span>
              <span>ВОССТАНОВЛЕНО 100%</span>
            </div>
            <div className="text-[11px] text-gray-400 italic">
              Распределите полученные очки характеристик в разделе "Персонаж".
            </div>
          </div>

          <button
            onClick={handleClaim}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 text-white font-orbitron font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(255,0,127,0.7)] hover:shadow-[0_0_30px_rgba(0,240,255,0.9)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>РАСПРЕДЕЛИТЬ СТАТЫ</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
