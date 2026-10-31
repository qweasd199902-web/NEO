import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Sparkles, Shield, Zap } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface Props {
  className?: string;
  onNavigateToCustomization?: () => void;
}

export const AvatarDisplay: React.FC<Props> = ({ className = '', onNavigateToCustomization }) => {
  const { state, currentTitle, currentTitleColor, showFloatingNotice, triggerHaptic } = useGame();
  const [isFlexing, setIsFlexing] = useState(false);

  // Equipped cosmetics
  const hasVisor = state.equippedAccessories.includes('acc_cyber_visor');
  const hasBionicArm = state.equippedAccessories.includes('acc_bionic_arm');
  const hasPowerGloves = state.equippedAccessories.includes('acc_power_gloves');

  // Aura styles
  const getAuraColorClass = () => {
    switch (state.equippedAura) {
      case 'aura_magenta_plasma':
        return 'shadow-[0_0_35px_rgba(255,0,127,0.8)] border-pink-500';
      case 'aura_cyan_quantum':
        return 'shadow-[0_0_35px_rgba(0,240,255,0.8)] border-cyan-400';
      case 'aura_solar_flare':
        return 'shadow-[0_0_35px_rgba(255,230,0,0.8)] border-yellow-400';
      case 'aura_matrix_green':
        return 'shadow-[0_0_35px_rgba(0,255,102,0.8)] border-emerald-400';
      default:
        return 'shadow-[0_0_20px_rgba(176,38,255,0.4)] border-purple-500/40';
    }
  };

  // Tap-to-flex idle clicker mechanic
  const handleCharacterClick = (e: React.MouseEvent) => {
    setIsFlexing(true);
    triggerHaptic();
    soundFx.playRepClick();
    showFloatingNotice('+2 XP ФЛЕКС', '#ffe600', e.clientX, e.clientY);
    setTimeout(() => setIsFlexing(false), 300);
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Background Cyber Portal / Retrowave Sun Ring */}
      <div className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-pink-500/20 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none flex items-center justify-center">
        <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-cyan-400/20 animate-[spin_30s_linear_infinite]" />
      </div>

      {/* Main Avatar Frame */}
      <div
        onClick={handleCharacterClick}
        className={`relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-2xl bg-gradient-to-b from-[#190936] to-[#0a0319] border-2 p-2 cursor-pointer transition-all duration-200 select-none ${getAuraColorClass()} ${
          isFlexing ? 'scale-105' : 'hover:scale-[1.02]'
        }`}
        title="Тапните персонажа для проверки боеготовности!"
      >
        {/* User custom uploaded photo or Cyborg Vector Graphic */}
        {state.customAvatarUrl ? (
          <img
            src={state.customAvatarUrl}
            alt="Cyber Avatar"
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-xl bg-black/40">
            {/* Cyberpunk Cyborg SVG Rig */}
            <svg
              viewBox="0 0 160 160"
              className="w-full h-full drop-shadow-[0_0_12px_rgba(255,0,127,0.7)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="armorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2e1065" />
                  <stop offset="100%" stopColor="#0f051d" />
                </linearGradient>
                <linearGradient id="neonPinkCyan" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff007f" />
                  <stop offset="100%" stopColor="#00f0ff" />
                </linearGradient>
              </defs>

              {/* Head Silhouette */}
              <circle cx="80" cy="48" r="24" fill="url(#armorGradient)" stroke="#ff007f" strokeWidth="2.5" />

              {/* Cyber Helmet & Visor */}
              {hasVisor ? (
                <rect x="62" y="42" width="36" height="10" rx="3" fill="#00f0ff" filter="drop-shadow(0 0 8px #00f0ff)" />
              ) : (
                <path d="M68 45 L92 45" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" />
              )}

              {/* Neural circuit lines on temple */}
              <path d="M96 40 L102 44 L102 52" stroke="#ffe600" strokeWidth="1.5" />

              {/* Neck & Shoulders */}
              <rect x="74" y="68" width="12" height="12" fill="#1e1b4b" stroke="#00f0ff" strokeWidth="1.5" />
              <path
                d="M40 98 L80 80 L120 98 L115 150 L45 150 Z"
                fill="url(#armorGradient)"
                stroke="#ff007f"
                strokeWidth="2.5"
              />

              {/* Chest Plate Reactor / Arc Core */}
              <polygon
                points="80,92 90,105 70,105"
                fill="#00f0ff"
                fillOpacity="0.8"
                stroke="#ffe600"
                strokeWidth="2"
                filter="drop-shadow(0 0 10px #00f0ff)"
              />

              {/* Bionic Arm Accessory overlay */}
              {hasBionicArm && (
                <g stroke="#00f0ff" strokeWidth="2.5" filter="drop-shadow(0 0 6px #00f0ff)">
                  <path d="M120 98 L142 120 L135 150" strokeLinecap="round" />
                  <circle cx="120" cy="98" r="5" fill="#ff007f" />
                  <circle cx="142" cy="120" r="4" fill="#ffe600" />
                </g>
              )}

              {/* Power Gloves */}
              {hasPowerGloves && (
                <circle cx="48" cy="142" r="7" fill="#ff007f" stroke="#ffe600" strokeWidth="2" filter="drop-shadow(0 0 6px #ff007f)" />
              )}
            </svg>
          </div>
        )}

        {/* Small Corner Status Tags */}
        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 border border-pink-500/50 text-[9px] font-mono text-pink-300">
          MK-{state.level}
        </div>
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 border border-cyan-400/50 text-[9px] font-mono text-cyan-300 flex items-center gap-1">
          <Sparkles size={10} /> TAP
        </div>
      </div>

      {/* Title & Customization button */}
      <div className="mt-2.5 flex flex-col items-center">
        <span
          className="font-orbitron font-bold text-xs tracking-wider uppercase drop-shadow-[0_0_6px_currentColor]"
          style={{ color: currentTitleColor }}
        >
          {currentTitle}
        </span>
        {onNavigateToCustomization && (
          <button
            onClick={onNavigateToCustomization}
            className="mt-1 text-[11px] font-mono text-cyan-400 hover:text-pink-400 underline underline-offset-2 transition-colors"
          >
            Кастомизировать образ
          </button>
        )}
      </div>
    </div>
  );
};
