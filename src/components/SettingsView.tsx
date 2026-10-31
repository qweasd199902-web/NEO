import React, { useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import {
  Settings,
  Volume2,
  Bell,
  Download,
  Upload,
  RotateCcw,
  ShieldAlert,
  Info,
  Sliders,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

export const SettingsView: React.FC = () => {
  const { state, updateSettings, exportData, importData, devResetProgress, showFloatingNotice } = useGame();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleMasterVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    updateSettings({ masterVolume: val });
    soundFx.setVolumes(val, state.settings.sfxVolume, state.settings.musicVolume);
  };

  const handleSfxVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    updateSettings({ sfxVolume: val });
    soundFx.setVolumes(state.settings.masterVolume, val, state.settings.musicVolume);
  };

  const handleBackupUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          importData(reader.result);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleTestNotification = () => {
    soundFx.playTimerBeep(true);
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('NEON FITNESS RPG', {
          body: 'Пора активировать нейросеть! Сегодняшняя тренировка ждет.',
          icon: '/favicon.ico'
        });
        showFloatingNotice('ТЕСТ УВЕДОМЛЕНИЯ ОТПРАВЛЕН', '#00ff66');
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('NEON FITNESS RPG', {
              body: 'Уведомления успешно подключены!',
              icon: '/favicon.ico'
            });
            showFloatingNotice('РАЗРЕШЕНИЕ ПОЛУЧЕНО', '#00ff66');
          }
        });
      } else {
        showFloatingNotice('УВЕДОМЛЕНИЯ В БРАУЗЕРЕ ЗАБЛОКИРОВАНЫ', '#ff0055');
      }
    } else {
      showFloatingNotice('СИМУЛЯЦИЯ: ВРЕМЯ ТРЕНИРОВКИ!', '#ffe600');
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#17052e] via-[#20083a] to-[#0c031a] border border-pink-500/40 flex items-center justify-between gap-4 shadow-[0_0_20px_rgba(255,0,127,0.2)]">
        <div>
          <h1 className="font-orbitron font-black text-xl text-white flex items-center gap-2">
            <Settings size={22} className="text-pink-500" />
            <span>НАСТРОЙКИ СИСТЕМЫ</span>
          </h1>
          <p className="font-mono text-xs text-gray-400">
            Звук, уведомления, таймеры отдыха, бэкап и медицинские правила.
          </p>
        </div>
      </div>

      {/* AUDIO & HAPTICS */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-purple-500/30 space-y-4 font-mono text-xs">
        <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
          <Volume2 size={18} className="text-cyan-400" />
          <span>ЗВУК И ТАКТИЛЬНАЯ ОБРАТНАЯ СВЯЗЬ</span>
        </h2>

        {/* Master Volume */}
        <div className="space-y-1">
          <div className="flex justify-between text-gray-300">
            <span>Общая громкость (Master)</span>
            <span className="font-bold text-white">{Math.round(state.settings.masterVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={state.settings.masterVolume}
            onChange={handleMasterVol}
            className="w-full accent-pink-500 cursor-pointer"
          />
        </div>

        {/* SFX Volume */}
        <div className="space-y-1">
          <div className="flex justify-between text-gray-300">
            <span>Звуковые эффекты (SFX кликера и левелапа)</span>
            <span className="font-bold text-white">{Math.round(state.settings.sfxVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={state.settings.sfxVolume}
            onChange={handleSfxVol}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        {/* Haptics Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-purple-500/20">
          <div>
            <div className="font-bold text-white text-sm">Вибрация (Тактильный отклик)</div>
            <div className="text-gray-400 text-[11px]">
              Вибрация смартфона при каждом выполненном повторении.
            </div>
          </div>
          <button
            onClick={() => updateSettings({ hapticsEnabled: !state.settings.hapticsEnabled })}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              state.settings.hapticsEnabled ? 'bg-pink-600' : 'bg-gray-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                state.settings.hapticsEnabled ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* WORKOUT & TIMERS PREFERENCES */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-purple-500/30 space-y-4 font-mono text-xs">
        <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
          <Sliders size={18} className="text-yellow-400" />
          <span>ПАРАМЕТРЫ ТРЕНИРОВОК И ОТДЫХА</span>
        </h2>

        {/* Default rest timer duration */}
        <div className="space-y-2">
          <span className="text-gray-300">Базовое время отдыха между подходами:</span>
          <div className="flex flex-wrap gap-2">
            {[30, 45, 60, 90].map(sec => (
              <button
                key={sec}
                onClick={() => updateSettings({ defaultRestSec: sec })}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  state.settings.defaultRestSec === sec
                    ? 'bg-yellow-400 text-black border border-yellow-300 font-bold'
                    : 'bg-black/50 border border-purple-500/30 text-gray-300'
                }`}
              >
                {sec} секунд
              </button>
            ))}
          </div>
        </div>

        {/* Units toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-purple-500/20">
          <div>
            <div className="font-bold text-white">Единицы измерения</div>
            <div className="text-gray-400 text-[11px]">Метрическая система (кг, см)</div>
          </div>
          <span className="px-2.5 py-1 rounded bg-black/60 border border-cyan-400 text-cyan-300 font-bold">
            МЕТРИЧЕСКИЕ (КГ)
          </span>
        </div>
      </div>

      {/* NOTIFICATIONS & REMINDERS */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-purple-500/30 space-y-4 font-mono text-xs">
        <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
          <Bell size={18} className="text-pink-400" />
          <span>ЛОКАЛЬНЫЕ НАПОМИНАНИЯ О ТРЕНИРОВКАХ</span>
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-black/40 border border-purple-500/20">
          <div>
            <div className="font-bold text-white text-sm">Ежедневное напоминание</div>
            <div className="text-gray-400 text-[11px]">
              Локальный сигнал Android / браузера без необходимости подключения к интернету.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="time"
              defaultValue="18:00"
              className="bg-black/70 border border-pink-500/50 text-white px-2 py-1 rounded font-mono"
            />
            <button
              onClick={handleTestNotification}
              className="px-3 py-1.5 rounded bg-pink-600/30 border border-pink-500 text-pink-300 hover:text-white transition-colors"
            >
              Тест
            </button>
          </div>
        </div>
      </div>

      {/* DATA BACKUP & RESTORE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-purple-500/30 space-y-4 font-mono text-xs">
        <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
          <Download size={18} className="text-emerald-400" />
          <span>РЕЗЕРВНОЕ КОПИРОВАНИЕ ДАННЫХ (БЭКАП)</span>
        </h2>

        <p className="text-gray-300 text-xs leading-relaxed">
          Все ваши данные, прогресс прокачки, экипировка и загруженные изображения сохраняются на вашем устройстве. Вы можете экспортировать файл в любой момент.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportData}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-mono font-bold hover:shadow-[0_0_12px_#00ff66] transition-all flex items-center gap-2"
          >
            <Download size={16} />
            <span>Экспорт бэкапа (JSON)</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={handleBackupUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl bg-black/60 border border-cyan-400 text-cyan-300 hover:text-white font-mono font-bold transition-all flex items-center gap-2"
          >
            <Upload size={16} />
            <span>Импорт бэкапа (JSON)</span>
          </button>
        </div>
      </div>

      {/* NATIVE ANDROID APK BUILD & PACKAGING */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-cyan-500/40 space-y-4 font-mono text-xs shadow-[0_0_20px_rgba(0,240,255,0.15)]">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
            <span className="text-cyan-400">🤖</span>
            <span>НАСТОЯЩИЙ НА ТИВНЫЙ ANDROID APK ПРОЕКТ</span>
          </h2>
          <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400 text-cyan-300 text-[10px] font-bold">
            GRADLE READY
          </span>
        </div>

        <p className="text-gray-300 text-xs leading-relaxed">
          В проекте уже развернута полноценная нативная Android архитектура с <code className="text-cyan-300 font-bold">AndroidManifest.xml</code>, пакетом <code className="text-pink-400">com.neonfitness.rpg</code>, нативными сервоприводами виброотклика и Gradle-скриптами.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/20 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>Способ 1: Android Studio (Рекомендуемый)</span>
            </div>
            <p className="text-[11px] text-gray-400">
              1. Откройте папку <code className="text-yellow-400">android/</code> в Android Studio.
              <br />
              2. В меню выберите: <strong className="text-cyan-300">Build ➔ Build Bundle(s) / APK(s) ➔ Build APK(s)</strong>.
              <br />
              3. Готовый установочный файл <code className="text-emerald-400">app-debug.apk</code> появится в папке <code className="text-gray-300">app/build/outputs/apk/debug/</code>.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/60 border border-purple-500/20 space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>Способ 2: Через Терминал (Gradle)</span>
            </div>
            <p className="text-[11px] text-gray-400">
              Выполните команду сборки в консоли:
            </p>
            <div className="p-2 rounded bg-black border border-gray-800 text-[11px] text-pink-400 font-mono select-all">
              cd android && ./gradlew assembleDebug
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-[11px] text-emerald-300">
          <strong className="text-emerald-200">Сборка в облаке без Android Studio: </strong>
          В репозиторий добавлен файл <code className="text-white">.github/workflows/build-apk.yml</code>. При загрузке проекта на GitHub он автоматически скомпилирует готовый <strong className="text-white">NeonFitnessRPG-Debug.apk</strong> и выдаст прямую ссылку на скачивание в разделе Artifacts!
        </div>
      </div>

      {/* SAFETY & HEALTH MANIFESTO */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-amber-200 font-mono text-xs space-y-2.5">
        <div className="flex items-center gap-2 text-amber-300 font-orbitron font-bold text-sm">
          <ShieldAlert size={18} />
          <span>МЕДИЦИНСКИЙ ПРОТОКОЛ БЕЗОПАСНОСТИ</span>
        </div>
        <p className="leading-relaxed">
          1. <strong>Принцип безболезненности:</strong> Физическая адаптация сухожилий требует времени. Если при выполнении возникает острая боль в коленях, ахилловом сухожилии или лучезапястном суставе — немедленно остановитесь.
        </p>
        <p className="leading-relaxed">
          2. <strong>День отдыха священен:</strong> Воскресенье специально выделено под отдых. Не пытайтесь тренироваться 7 дней в неделю через силу — это приводит к перетренированности связочного аппарата.
        </p>
        <p className="leading-relaxed">
          3. <strong>Постепенная прогрессия:</strong> Не форсируйте одновременно повторения и амплитуду. Следуйте установленным этапам адаптации.
        </p>
      </div>

      {/* DANGER ZONE: FACTORY RESET */}
      <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/40 font-mono text-xs space-y-3">
        <div className="font-bold text-red-400 flex items-center gap-2">
          <RotateCcw size={16} />
          <span>ОПАСНАЯ ЗОНА: СБРОС ДАННЫХ</span>
        </div>
        <p className="text-gray-400">
          Полное удаление всех игровых сохранений, прогресса уровней и кастомизации.
        </p>
        {resetConfirmOpen ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                devResetProgress();
                setResetConfirmOpen(false);
              }}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-500"
            >
              Да, полностью стереть все данные
            </button>
            <button
              onClick={() => setResetConfirmOpen(false)}
              className="px-3 py-2 rounded-lg bg-black/60 text-gray-300"
            >
              Отмена
            </button>
          </div>
        ) : (
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="px-3 py-1.5 rounded border border-red-500/40 text-red-400 hover:bg-red-950/40"
          >
            Сбросить весь прогресс
          </button>
        )}
      </div>
    </div>
  );
};
