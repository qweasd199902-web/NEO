import React from 'react';
import { useGame } from '../context/GameContext';
import { AvatarDisplay } from './AvatarDisplay';
import { StatType } from '../types';
import {
  BicepsFlexed,
  Heart,
  Activity,
  HandMetal,
  ShieldCheck,
  RefreshCw,
  Plus,
  Zap,
  Sparkles,
  Award
} from 'lucide-react';

export const CharacterView: React.FC = () => {
  const { state, currentTitle, currentTitleColor, allocateStatPoint } = useGame();

  const statConfigs: {
    type: StatType;
    labelRu: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    border: string;
    text: string;
  }[] = [
    {
      type: 'strength',
      labelRu: 'Сила (Strength)',
      description: 'Мощность квадрицепсов, ягодиц и мышечных волокон.',
      icon: <BicepsFlexed size={18} />,
      color: 'bg-red-500/20',
      border: 'border-red-500/40',
      text: 'text-red-400'
    },
    {
      type: 'grip',
      labelRu: 'Хват (Grip)',
      description: 'Плотность сухожилий кистей, сгибателей и сила пальцев.',
      icon: <HandMetal size={18} />,
      color: 'bg-yellow-500/20',
      border: 'border-yellow-500/40',
      text: 'text-yellow-400'
    },
    {
      type: 'endurance',
      labelRu: 'Выносливость (Endurance)',
      description: 'Кардиореспираторный тонус и сопротивляемость утомлению.',
      icon: <Activity size={18} />,
      color: 'bg-cyan-500/20',
      border: 'border-cyan-500/40',
      text: 'text-cyan-400'
    },
    {
      type: 'mobility',
      labelRu: 'Подвижность (Mobility)',
      description: 'Эластичность фасций, свобода позвоночника и здоровье суставов.',
      icon: <RefreshCw size={18} />,
      color: 'bg-purple-500/20',
      border: 'border-purple-500/40',
      text: 'text-purple-400'
    },
    {
      type: 'vitality',
      labelRu: 'Живучесть (Vitality)',
      description: 'Объем максимального HP и координационная стабильность.',
      icon: <Heart size={18} />,
      color: 'bg-emerald-500/20',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400'
    },
    {
      type: 'recovery',
      labelRu: 'Восстановление (Recovery)',
      description: 'Скорость регенерации микронадрывов и парасимпатический тонус.',
      icon: <ShieldCheck size={18} />,
      color: 'bg-blue-500/20',
      border: 'border-blue-500/40',
      text: 'text-blue-400'
    }
  ];

  // Calculate overall Power Rating (CPR - Cybernetic Power Rating)
  const totalStats = Object.values(state.stats).reduce((acc, v) => acc + v, 0);
  const powerRating = Math.round(totalStats * 15 + state.level * 45);

  return (
    <div className="space-y-4 pb-24">
      {/* Top Profile Summary */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#17062f] via-[#20083a] to-[#0c031a] border border-pink-500/40 flex flex-col md:flex-row items-center gap-6 shadow-[0_0_25px_rgba(255,0,127,0.2)]">
        <AvatarDisplay />

        <div className="flex-1 w-full space-y-3 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-2.5 py-1 rounded bg-pink-900/60 border border-pink-500 font-mono text-xs text-pink-300">
              УРОВЕНЬ {state.level}
            </span>
            <span
              className="px-2.5 py-1 rounded bg-black/60 border font-mono text-xs font-bold"
              style={{ color: currentTitleColor, borderColor: currentTitleColor }}
            >
              {currentTitle}
            </span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-orbitron font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400">
              {powerRating} CPR
            </span>
            <span className="text-xs font-mono text-gray-400">(Cyber Power Rating)</span>
          </div>

          {/* Stat Points Available Alert */}
          {state.unallocatedStatPoints > 0 ? (
            <div className="p-3 rounded-xl bg-yellow-950/40 border border-yellow-400 text-yellow-300 font-mono text-xs flex items-center justify-between shadow-[0_0_15px_rgba(255,230,0,0.3)] animate-pulse">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" />
                <span>
                  Доступно очков для прокачки: <strong>{state.unallocatedStatPoints} SP</strong>
                </span>
              </div>
              <span className="text-[11px] text-yellow-400 underline">Жмите [+] ниже</span>
            </div>
          ) : (
            <div className="text-xs font-mono text-gray-400">
              Получайте новые очки навыков (SP) за повышение уровня и завершение этапов.
            </div>
          )}
        </div>
      </div>

      {/* STATS MATRIX */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-400" />
            <span>ХАРАКТЕРИСТИКИ КИБЕР-АТЛЕТА</span>
          </h2>
          <span className="font-mono text-xs text-gray-400">
            Очки SP: <strong className="text-yellow-400">{state.unallocatedStatPoints}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {statConfigs.map(s => {
            const statValue = state.stats[s.type];
            const canUpgrade = state.unallocatedStatPoints > 0;

            return (
              <div
                key={s.type}
                className={`p-3.5 rounded-xl border bg-black/50 ${s.border} flex items-center justify-between gap-3 transition-all hover:bg-black/70`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${s.color} ${s.text} shrink-0 mt-0.5`}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-orbitron font-bold text-sm text-white">
                        {s.labelRu}
                      </span>
                      <span className={`font-orbitron font-black text-base ${s.text}`}>
                        {Math.floor(statValue)}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-gray-400 max-w-xs mt-0.5">
                      {s.description}
                    </p>
                  </div>
                </div>

                {/* Upgrade Button */}
                <button
                  onClick={() => allocateStatPoint(s.type)}
                  disabled={!canUpgrade}
                  className={`p-2 rounded-xl font-bold transition-all flex items-center justify-center shrink-0 ${
                    canUpgrade
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border border-cyan-400 shadow-[0_0_10px_#ff007f] hover:scale-110 active:scale-95'
                      : 'bg-black/30 border border-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                  title={canUpgrade ? `Прокачать ${s.labelRu}` : 'Нет свободных очков SP'}
                >
                  <Plus size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
