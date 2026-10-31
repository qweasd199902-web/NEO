import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Shield, Zap, Sparkles, Volume2, VolumeX, Terminal, Flame } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

import { NavTabId } from './Navigation';

interface Props {
  onOpenDevMode: () => void;
  onNavigate: (tab: NavTabId) => void;
}

export const HeaderHUD: React.FC<Props> = ({ onOpenDevMode, onNavigate }) => {
  const { state, xpToNextLevel, currentTitle, currentTitleColor, unlockDevMode, showFloatingNotice, updateSettings } = useGame();
  const [logoClicks, setLogoClicks] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const xpPercent = Math.min(100, Math.floor((state.xp / xpToNextLevel) * 100));
  const hpPercent = Math.min(100, Math.floor((state.hp / state.maxHp) * 100));
  const energyPercent = Math.min(100, Math.floor((state.energy / state.maxEnergy) * 100));

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    soundFx.playRepClick();
    if (next >= 5) {
      unlockDevMode();
      setLogoClicks(0);
    } else if (next >= 3) {
      showFloatingNotice(`DEV KEY: ${5 - next} ТАПОВ`, '#ffe600');
    }
  };

  const toggleMute = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    updateSettings({
      masterVolume: nextMuted ? 0 : 0.8
    });
    soundFx.setVolumes(nextMuted ? 0 : 0.8, state.settings.sfxVolume, state.settings.musicVolume);
    showFloatingNotice(nextMuted ? 'ЗВУК ВЫКЛЮЧЕН' : 'ЗВУК ВКЛЮЧЕН', nextMuted ? '#ff0055' : '#00ff66');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#090417]/95 backdrop-blur-md border-b border-pink-500/30 px-3 py-2 shadow-[0_4px_20px_rgba(255,0,127,0.15)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        {/* Top bar: Logo, Level, Currencies, System Controls */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Dev Mode trigger */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer select-none group"
            title="Тапните 5 раз для входа в Dev Mode"
          >
            <div className="relative w-8 h-8 rounded bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center border border-pink-400 shadow-[0_0_10px_#ff007f] group-hover:scale-105 transition-transform">
              <span className="font-orbitron font-black text-white text-xs">NR</span>
              <div className="absolute -inset-0.5 rounded border border-cyan-400 opacity-60 animate-pulse pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-orbitron font-black text-sm tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400">
                  NEON RPG
                </span>
                <span className="text-[9px] px-1 py-0.2 bg-pink-900/60 text-pink-400 border border-pink-500/40 font-mono rounded">
                  80s
                </span>
              </div>
              <div className="text-[10px] font-mono leading-none" style={{ color: currentTitleColor }}>
                {currentTitle}
              </div>
            </div>
          </div>

          {/* Currencies & Badges */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Credits ₢ */}
            <div
              onClick={() => onNavigate('shop')}
              className="flex items-center gap-1 px-2.5 py-1 bg-black/60 rounded border border-yellow-500/40 text-yellow-400 font-mono text-xs cursor-pointer hover:border-yellow-400 hover:shadow-[0_0_8px_#ffe600] transition-all"
            >
              <span className="text-yellow-400 font-bold">₢</span>
              <span className="font-bold">{state.credits.toLocaleString()}</span>
            </div>

            {/* Tokens 💎 */}
            <div
              onClick={() => onNavigate('shop')}
              className="flex items-center gap-1 px-2.5 py-1 bg-black/60 rounded border border-cyan-500/40 text-cyan-400 font-mono text-xs cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_8px_#00f0ff] transition-all"
            >
              <span>💎</span>
              <span className="font-bold">{state.tokens}</span>
            </div>

            {/* Audio Mute/Unmute */}
            <button
              onClick={toggleMute}
              className="p-1.5 rounded bg-black/50 border border-purple-500/40 text-purple-300 hover:text-cyan-300 hover:border-cyan-400 transition-colors"
              title="Звук"
            >
              {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Dev Mode button if unlocked */}
            {state.devModeUnlocked && (
              <button
                onClick={onOpenDevMode}
                className="flex items-center gap-1 px-2 py-1 rounded bg-pink-950/80 border border-pink-500 text-pink-300 hover:bg-pink-900 hover:shadow-[0_0_10px_#ff007f] font-mono text-[10px] transition-all"
              >
                <Terminal size={12} />
                <span>DEV</span>
              </button>
            )}
          </div>
        </div>

        {/* Status HUD Bars: Level & XP, HP, Energy */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px] font-mono">
          {/* Level & XP */}
          <div className="flex flex-col gap-0.5 bg-black/40 px-2 py-1 rounded border border-pink-500/20">
            <div className="flex justify-between items-center text-pink-400">
              <span className="font-bold font-orbitron text-xs flex items-center gap-1">
                <Sparkles size={11} /> LVL {state.level}
              </span>
              <span>{state.xp} / {xpToNextLevel} XP ({xpPercent}%)</span>
            </div>
            <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-pink-500/30">
              <div
                className="h-full bg-gradient-to-r from-pink-600 via-purple-500 to-cyan-400 transition-all duration-300 rounded-full shadow-[0_0_8px_#ff007f]"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* HP (Vitality) */}
          <div className="flex flex-col gap-0.5 bg-black/40 px-2 py-1 rounded border border-emerald-500/20">
            <div className="flex justify-between items-center text-emerald-400">
              <span className="font-bold flex items-center gap-1">
                <Shield size={11} /> HP: ЖИВУЧЕСТЬ
              </span>
              <span>{state.hp} / {state.maxHp}</span>
            </div>
            <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-emerald-500/30">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-green-400 transition-all duration-300 rounded-full shadow-[0_0_8px_#00ff66]"
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>

          {/* Energy */}
          <div className="flex flex-col gap-0.5 bg-black/40 px-2 py-1 rounded border border-cyan-500/20">
            <div className="flex justify-between items-center text-cyan-400">
              <span className="font-bold flex items-center gap-1">
                <Zap size={11} /> ЭНЕРГИЯ
              </span>
              <span>{state.energy} / {state.maxEnergy}</span>
            </div>
            <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-cyan-500/30">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 rounded-full shadow-[0_0_8px_#00f0ff]"
                style={{ width: `${energyPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Active Buffs indicator bar if any are running */}
        {state.activeBuffs.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none text-[10px] font-mono">
            <span className="text-yellow-400 flex items-center gap-1 shrink-0 font-bold">
              <Flame size={11} /> БАФЫ:
            </span>
            {state.activeBuffs.map(buff => {
              const remainingMinutes = Math.max(0, Math.ceil((buff.expiresAt - Date.now()) / 60000));
              return (
                <div
                  key={buff.id}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-950/40 border border-yellow-500/40 text-yellow-300 shrink-0"
                >
                  <span>{buff.icon}</span>
                  <span>{buff.name}</span>
                  <span className="text-yellow-400 font-bold">({remainingMinutes}м)</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
