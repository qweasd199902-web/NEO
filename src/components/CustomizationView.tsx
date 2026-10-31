import React, { useRef } from 'react';
import { useGame } from '../context/GameContext';
import { AvatarDisplay } from './AvatarDisplay';
import { Palette, Camera, Trash2, Monitor, Sparkles, Check } from 'lucide-react';
import { ThemePreset } from '../types';

export const CustomizationView: React.FC = () => {
  const { state, setCustomAvatar, updateSettings, showFloatingNotice } = useGame();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCustomAvatar(reader.result);
          showFloatingNotice('АВАТАР ОБНОВЛЕН', '#00ff66');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectTheme = (theme: ThemePreset) => {
    updateSettings({ theme });
    showFloatingNotice(`ТЕМА: ${theme.toUpperCase()}`, '#00f0ff');
  };

  const themes: { id: ThemePreset; nameRu: string; desc: string; colors: string[] }[] = [
    {
      id: 'blood-dragon',
      nameRu: 'Far Cry 3: Blood Dragon',
      desc: 'Классический ретрофутуризм 80-х, неон-розовый и лазерный циан.',
      colors: ['#ff007f', '#00f0ff', '#b026ff']
    },
    {
      id: 'miami-vice',
      nameRu: 'Miami Vice Synthwave',
      desc: 'Неоновые пальмы, бирюзовый океан и фиолетовый закат.',
      colors: ['#00f0ff', '#a855f7', '#ec4899']
    },
    {
      id: 'matrix',
      nameRu: 'Matrix Cyber Terminal',
      desc: 'Изумрудно-зеленый терминал хакера киберпространства.',
      colors: ['#00ff66', '#059669', '#10b981']
    },
    {
      id: 'outrun',
      nameRu: 'Outrun Sunset 1986',
      desc: 'Янтарное солнце, раскаленный горизонт и золотистый неон.',
      colors: ['#f59e0b', '#ef4444', '#ffe600']
    }
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#17052e] via-[#20083a] to-[#0c031a] border border-pink-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_20px_rgba(255,0,127,0.2)]">
        <AvatarDisplay />

        <div className="flex-1 space-y-3 text-center md:text-left">
          <h1 className="font-orbitron font-black text-xl text-white flex items-center justify-center md:justify-start gap-2">
            <Palette size={22} className="text-pink-500" />
            <span>КАСТОМИЗАЦИЯ НЕЙРОИНТЕРФЕЙСА</span>
          </h1>
          <p className="font-mono text-xs text-gray-300 max-w-lg">
            Настройте персональный аватар, выберите цветовую тему и управляйте ретро-эффектами CRT монитора.
          </p>

          {/* Avatar upload actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold shadow-[0_0_10px_#ff007f] transition-all flex items-center gap-2"
            >
              <Camera size={15} />
              <span>Загрузить фото из памяти</span>
            </button>

            {state.customAvatarUrl && (
              <button
                onClick={() => setCustomAvatar(null)}
                className="px-3 py-2 rounded-xl bg-black/60 border border-red-500/50 text-red-400 hover:text-red-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <Trash2 size={15} />
                <span>Сбросить на киборга</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* THEMES SELECTION */}
      <div className="space-y-3">
        <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
          <Sparkles size={18} className="text-cyan-400" />
          <span>ЦВЕТОВЫЕ ТЕМЫ ОФОРМЛЕНИЯ</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {themes.map(t => {
            const isSelected = state.settings.theme === t.id;

            return (
              <div
                key={t.id}
                onClick={() => handleSelectTheme(t.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-pink-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'bg-black/40 border-purple-500/20 hover:border-pink-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-orbitron font-bold text-sm text-white">
                    {t.nameRu}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-cyan-400 text-xs font-mono font-bold">
                      <Check size={14} /> ВЫБРАНО
                    </span>
                  )}
                </div>

                <p className="font-mono text-xs text-gray-400 mb-3">{t.desc}</p>

                {/* Color preview palette */}
                <div className="flex items-center gap-2">
                  {t.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VISUAL CRT & ANIMATION TOGGLES */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-purple-500/30 space-y-4">
        <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
          <Monitor size={18} className="text-yellow-400" />
          <span>ЭФФЕКТЫ ДИСПЛЕЯ И CRT СКАНЛАЙНЫ</span>
        </h2>

        <div className="space-y-3 font-mono text-xs">
          {/* CRT Scanline Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-purple-500/20">
            <div>
              <div className="font-bold text-white text-sm">CRT Scanlines Эффект</div>
              <div className="text-gray-400 text-[11px]">
                Ретро-линии телевизионной развертки ЭЛТ монитора 1984 года.
              </div>
            </div>
            <button
              onClick={() => updateSettings({ crtFilterEnabled: !state.settings.crtFilterEnabled })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                state.settings.crtFilterEnabled ? 'bg-pink-600' : 'bg-gray-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  state.settings.crtFilterEnabled ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Smooth Animations Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-purple-500/20">
            <div>
              <div className="font-bold text-white text-sm">Неоновые Анимации & Вспышки</div>
              <div className="text-gray-400 text-[11px]">
                Плавные визуальные эффекты и свечение интерфейса при тренировках.
              </div>
            </div>
            <button
              onClick={() => updateSettings({ animationsEnabled: !state.settings.animationsEnabled })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                state.settings.animationsEnabled ? 'bg-cyan-600' : 'bg-gray-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  state.settings.animationsEnabled ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
