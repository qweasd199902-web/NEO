import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { StatType } from '../types';
import { soundFx } from '../utils/soundEffects';
import {
  Terminal,
  X,
  Sparkles,
  Zap,
  RotateCcw,
  ShieldAlert,
  Play,
  CheckCircle2,
  Lock,
  Unlock,
  FastForward
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    state,
    unlockDevMode,
    devUpdateStat,
    devAddCurrency,
    devSetLevel,
    devUnlockAll,
    devResetProgress,
    exportData,
    setSelectedDayId,
    showFloatingNotice
  } = useGame();

  const [secretCodeInput, setSecretCodeInput] = useState('');

  if (!isOpen) return null;

  const handleSecretCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretCodeInput.trim().toUpperCase() === 'BLOODDRAGON84' || secretCodeInput.trim().toUpperCase() === 'NEON1984') {
      unlockDevMode();
      setSecretCodeInput('');
      showFloatingNotice('КОД ПРИНЯТ: DEV РЕЖИМ РАЗБЛОКИРОВАН', '#00ff66');
    } else {
      showFloatingNotice('НЕВЕРНЫЙ КОД ДОСТУПА', '#ff0055');
    }
  };

  const handleSimulateDay = (dayId: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun') => {
    setSelectedDayId(dayId);
    showFloatingNotice(`СИМУЛЯЦИЯ ДНЯ: ${dayId.toUpperCase()}`, '#ffe600');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090317] border-2 border-pink-500 p-4 sm:p-6 shadow-[0_0_50px_rgba(255,0,127,0.7)] space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-500/30 pb-3">
          <div className="flex items-center gap-2">
            <Terminal size={20} className="text-pink-500" />
            <h2 className="font-orbitron font-black text-sm sm:text-base text-white tracking-wider">
              DEVELOPER COMMAND CONSOLE
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* If locked, prompt for secret code */}
        {!state.devModeUnlocked ? (
          <form onSubmit={handleSecretCodeSubmit} className="space-y-4 py-4 text-center">
            <Lock size={36} className="mx-auto text-pink-500" />
            <div className="font-orbitron font-bold text-white text-sm">
              РЕЖИМ РАЗРАБОТЧИКА ЗАБЛОКИРОВАН
            </div>
            <p className="font-mono text-xs text-gray-400 max-w-xs mx-auto">
              Введите секретный ключ доступа (подсказка: BLOODDRAGON84 или тапните логотип 5 раз).
            </p>
            <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
              <input
                type="text"
                placeholder="Секретный код..."
                value={secretCodeInput}
                onChange={e => setSecretCodeInput(e.target.value)}
                className="w-full bg-black/70 border border-pink-500/50 rounded px-3 py-1.5 text-white font-mono text-xs uppercase"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-pink-600 text-white font-mono text-xs font-bold hover:bg-pink-500"
              >
                Ввод
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-5 font-mono text-xs">
            {/* Currency & Level Boosts */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-pink-500/30 space-y-3">
              <div className="font-bold text-pink-400 flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>ВАЛЮТА И УРОВЕНЬ</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => devAddCurrency(1000, 0)}
                  className="px-3 py-1.5 rounded bg-yellow-950/60 border border-yellow-500 text-yellow-300 hover:bg-yellow-900/60"
                >
                  +1000 Credits (₢)
                </button>
                <button
                  onClick={() => devAddCurrency(0, 10)}
                  className="px-3 py-1.5 rounded bg-cyan-950/60 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/60"
                >
                  +10 Tokens (💎)
                </button>
                <button
                  onClick={() => devSetLevel(state.level + 1)}
                  className="px-3 py-1.5 rounded bg-pink-950/60 border border-pink-500 text-pink-300 hover:bg-pink-900/60"
                >
                  +1 Level (Текущий: {state.level})
                </button>
                <button
                  onClick={() => devSetLevel(10)}
                  className="px-3 py-1.5 rounded bg-purple-950/60 border border-purple-500 text-purple-300 hover:bg-purple-900/60"
                >
                  Установить Level 10
                </button>
              </div>
            </div>

            {/* Quick Unlocks */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-cyan-500/30 space-y-3">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Unlock size={14} />
                <span>РАЗБЛОКИРОВКА КОНТЕНТА</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={devUnlockAll}
                  className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-black font-bold shadow-[0_0_8px_#00f0ff]"
                >
                  Разблокировать ВСЕ скины, ауры и ачивки
                </button>
              </div>
            </div>

            {/* Core Stats Editor */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-purple-500/30 space-y-3">
              <div className="font-bold text-purple-400">РЕДАКТОР СТАТОВ ПЕРСОНАЖА</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['strength', 'grip', 'endurance', 'mobility', 'vitality', 'recovery'] as StatType[]).map(s => (
                  <div key={s} className="flex items-center justify-between p-2 rounded bg-black/40 border border-purple-500/20">
                    <span className="capitalize">{s}: {Math.floor(state.stats[s])}</span>
                    <button
                      onClick={() => devUpdateStat(s, state.stats[s] + 5)}
                      className="px-2 py-0.5 rounded bg-purple-700 hover:bg-purple-600 text-white font-bold"
                    >
                      +5
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Day Simulator */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-yellow-500/30 space-y-3">
              <div className="font-bold text-yellow-400 flex items-center gap-1.5">
                <FastForward size={14} />
                <span>СИМУЛЯЦИЯ ДНЕЙ НЕДЕЛИ</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => handleSimulateDay(d)}
                    className="px-2.5 py-1 rounded bg-black/60 border border-yellow-500/40 text-yellow-300 hover:border-yellow-400"
                  >
                    {d.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* SFX Tests */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-gray-700 space-y-2">
              <div className="font-bold text-gray-300">ТЕСТИРОВАНИЕ АУДИО-СИНТЕЗАТОРА</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => soundFx.playRepClick()}
                  className="px-2.5 py-1 rounded bg-black/50 border border-gray-600 text-gray-300"
                >
                  SFX: Rep Click
                </button>
                <button
                  onClick={() => soundFx.playCoin()}
                  className="px-2.5 py-1 rounded bg-black/50 border border-gray-600 text-gray-300"
                >
                  SFX: Coin Ding
                </button>
                <button
                  onClick={() => soundFx.playLevelUp()}
                  className="px-2.5 py-1 rounded bg-black/50 border border-gray-600 text-gray-300"
                >
                  SFX: Level Up Fanfare
                </button>
                <button
                  onClick={() => soundFx.playTimerBeep(true)}
                  className="px-2.5 py-1 rounded bg-black/50 border border-gray-600 text-gray-300"
                >
                  SFX: Timer Finish
                </button>
              </div>
            </div>

            {/* Full Reset */}
            <div className="pt-2 border-t border-red-500/30 flex justify-between items-center">
              <span className="text-red-400">Полный фабричный сброс профиля:</span>
              <button
                onClick={() => {
                  devResetProgress();
                  onClose();
                }}
                className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold"
              >
                СБРОСИТЬ ВСЁ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
