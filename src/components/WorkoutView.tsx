import React, { useState, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { ALL_EXERCISES, WORKOUT_DAYS, TRAINING_STAGES_INFO } from '../data/exercisesData';
import { ExerciseIllustration } from './ExerciseIllustration';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  CheckCircle2,
  Clock,
  Sparkles,
  Camera,
  Trash2,
  Layers,
  ChevronRight,
  Info,
  ShieldAlert,
  Flame,
  Award
} from 'lucide-react';

export const WorkoutView: React.FC = () => {
  const {
    state,
    selectedDayId,
    setSelectedDayId,
    isWorkoutSessionActive,
    activeExerciseIndex,
    currentSet,
    targetSets,
    currentReps,
    targetReps,
    isResting,
    restTimerSeconds,
    isTimerRunning,
    timerSeconds,
    startWorkout,
    logRepetition,
    finishCurrentSet,
    skipRestTimer,
    nextExercise,
    prevExercise,
    toggleExerciseTimer,
    finishWorkoutSession,
    cancelWorkoutSession,
    setExerciseCustomImage,
    removeExerciseCustomImage,
    updateSettings
  } = useGame();

  const [activeTab, setActiveTab] = useState<'schedule' | 'exercise'>(
    isWorkoutSessionActive ? 'exercise' : 'schedule'
  );
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active workout day
  const currentWorkoutDay = WORKOUT_DAYS.find(d => d.id === selectedDayId) || WORKOUT_DAYS[0];

  // Exercises list for this day
  const dayExercises = currentWorkoutDay.exerciseIds
    .map(id => ALL_EXERCISES.find(e => e.id === id))
    .filter((e): e is typeof ALL_EXERCISES[0] => !!e);

  // Current active exercise in session OR selected in preview
  const currentSessionExercise = dayExercises[activeExerciseIndex] || dayExercises[0];
  const previewExercise = ALL_EXERCISES.find(e => e.id === selectedExerciseId) || currentSessionExercise;
  const displayExercise = isWorkoutSessionActive ? currentSessionExercise : previewExercise;

  const customImg = displayExercise ? state.exerciseCustomImages[displayExercise.id] : undefined;

  // Handle custom image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && displayExercise) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setExerciseCustomImage(displayExercise.id, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStageChange = (newStage: 1 | 2 | 3 | 4) => {
    updateSettings({ currentStage: newStage });
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Top Header & Stage Difficulty Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#120626] border border-pink-500/30">
        <div>
          <h1 className="font-orbitron font-bold text-lg text-white flex items-center gap-2">
            <span className="text-pink-500">CYBER</span> ВОРКАУТ-ПРОГРАММА
          </h1>
          <p className="font-mono text-xs text-gray-400">
            Анатомический комплекс восстановления и развития связок, суставов и хвата.
          </p>
        </div>

        {/* Stage Selector */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto font-mono text-xs">
          <span className="text-gray-400 text-[11px] mr-1">Этап:</span>
          {([1, 2, 3, 4] as const).map(s => {
            const isSelected = state.settings.currentStage === s;
            return (
              <button
                key={s}
                onClick={() => handleStageChange(s)}
                className={`px-2.5 py-1 rounded font-bold transition-all ${
                  isSelected
                    ? 'bg-pink-600 text-white border border-cyan-400 shadow-[0_0_8px_#ff007f]'
                    : 'bg-black/60 text-gray-400 border border-purple-500/30 hover:text-white'
                }`}
                title={TRAINING_STAGES_INFO[s - 1].name}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Info Card */}
      <div className="p-3 rounded-lg bg-black/40 border border-purple-500/20 text-xs font-mono flex items-center justify-between text-gray-300">
        <div className="flex items-center gap-2">
          <Layers size={15} className="text-pink-400" />
          <span>
            <strong className="text-white">{TRAINING_STAGES_INFO[state.settings.currentStage - 1].name}</strong> ({TRAINING_STAGES_INFO[state.settings.currentStage - 1].duration}) — {TRAINING_STAGES_INFO[state.settings.currentStage - 1].description}
          </span>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
        {WORKOUT_DAYS.map(day => {
          const isSelected = selectedDayId === day.id;
          return (
            <button
              key={day.id}
              onClick={() => {
                setSelectedDayId(day.id);
                setSelectedExerciseId(null);
                if (!isWorkoutSessionActive) {
                  setActiveTab('schedule');
                }
              }}
              className={`px-3 py-2 rounded-lg font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border border-cyan-400 shadow-[0_0_12px_rgba(255,0,127,0.5)]'
                  : 'bg-[#100524] text-gray-400 border border-pink-500/20 hover:text-white hover:border-pink-500/50'
              }`}
            >
              <span>{day.nameRu.slice(0, 2).toUpperCase()}</span>
              {day.isRestDay && <span className="text-[10px] text-yellow-400">💤</span>}
            </button>
          );
        })}

        {/* Bonus Exercises Tab */}
        <button
          onClick={() => {
            setSelectedExerciseId('extra_abs_crunch');
            setActiveTab('exercise');
          }}
          className="px-3 py-2 rounded-lg font-bold whitespace-nowrap transition-all bg-[#100524] text-yellow-400 border border-yellow-500/40 hover:border-yellow-400"
        >
          ДОП. МЫШЦЫ
        </button>
      </div>

      {/* REST TIMER OVERLAY / BANNER IF ACTIVE */}
      {isResting && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/90 to-pink-900/90 border-2 border-yellow-400 shadow-[0_0_25px_#ffe600] flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-yellow-400 flex items-center justify-center font-orbitron font-black text-xl text-yellow-300 bg-black/60 shadow-[0_0_10px_#ffe600]">
              {restTimerSeconds}
            </div>
            <div>
              <div className="font-orbitron font-bold text-white text-sm">
                ПЕРИОД ВОССТАНОВЛЕНИЯ СУХОЖИЛИЙ
              </div>
              <div className="font-mono text-xs text-yellow-200">
                Сделайте пару глубоких диафрагмальных вдохов перед следующим подходом.
              </div>
            </div>
          </div>
          <button
            onClick={skipRestTimer}
            className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-orbitron font-bold text-xs hover:bg-yellow-300 shadow-[0_0_10px_#ffe600] active:scale-95 transition-all"
          >
            ПРОПУСТИТЬ ОТДЫХ ➔
          </button>
        </div>
      )}

      {/* WORKOUT ACTIVE SESSION CONTROLS BAR */}
      {isWorkoutSessionActive && (
        <div className="p-3 rounded-xl bg-gradient-to-r from-pink-950/80 to-purple-950/80 border border-pink-500/50 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-pink-300">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
            <span className="font-bold">
              ТРЕНИРОВКА: {currentWorkoutDay.nameRu} ({activeExerciseIndex + 1} / {dayExercises.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevExercise}
              disabled={activeExerciseIndex === 0}
              className="p-1.5 rounded bg-black/60 border border-purple-500/40 text-gray-300 hover:text-white disabled:opacity-40"
              title="Предыдущее"
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={nextExercise}
              disabled={activeExerciseIndex >= dayExercises.length - 1}
              className="p-1.5 rounded bg-black/60 border border-purple-500/40 text-gray-300 hover:text-white disabled:opacity-40"
              title="Следующее"
            >
              <SkipForward size={16} />
            </button>
            <button
              onClick={finishWorkoutSession}
              className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1 shadow-[0_0_10px_#00ff66]"
            >
              <CheckCircle2 size={14} /> ЗАВЕРШИТЬ СЕССИЮ
            </button>
            <button
              onClick={cancelWorkoutSession}
              className="px-2.5 py-1.5 rounded bg-black/60 border border-red-500/40 text-red-400 font-mono text-xs hover:text-red-300"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* MAIN EXERCISE CARD (Interactive Clicker & Timer HUD) */}
      {displayExercise && (
        <div className="rounded-2xl border-2 border-pink-500/40 bg-gradient-to-b from-[#140628] to-[#0a0319] p-4 sm:p-6 shadow-[0_0_30px_rgba(255,0,127,0.2)] space-y-5">
          {/* Title & Target Details */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-pink-500/20 pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-pink-900/60 border border-pink-500/40 text-pink-300 text-[10px] font-mono uppercase">
                  {displayExercise.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono uppercase">
                  {displayExercise.type === 'reps' ? 'РУЧНОЙ КЛИКЕР' : 'АВТО-ТАЙМЕР'}
                </span>
              </div>
              <h2 className="font-orbitron font-black text-xl sm:text-2xl text-white">
                {displayExercise.name}
              </h2>
            </div>

            {/* Custom Image Upload Button */}
            <div className="flex items-center gap-2 self-start">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-black/60 border border-purple-500/40 hover:border-cyan-400 text-purple-300 hover:text-cyan-300 text-xs font-mono transition-all"
                title="Загрузить свое изображение из памяти телефона"
              >
                <Camera size={14} />
                <span>Свое фото</span>
              </button>
              {customImg && (
                <button
                  onClick={() => removeExerciseCustomImage(displayExercise.id)}
                  className="p-1.5 rounded bg-red-950/60 border border-red-500/40 text-red-400 hover:text-red-300"
                  title="Удалить пользовательское фото"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Hologram Illustration */}
          <ExerciseIllustration
            type={displayExercise.svgType}
            name={displayExercise.name}
            customImageUri={customImg}
            isTimerActive={isTimerRunning}
            className="w-full h-56 sm:h-64"
          />

          {/* Sets, Reps & Execution HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
            <div className="p-2.5 rounded-lg bg-black/50 border border-pink-500/30">
              <div className="text-[10px] text-gray-400">ПОДХОДЫ</div>
              <div className="font-orbitron font-bold text-lg text-pink-400">
                {currentSet} / {targetSets}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-black/50 border border-cyan-500/30">
              <div className="text-[10px] text-gray-400">
                {displayExercise.type === 'reps' ? 'ПОВТОРЕНИЯ' : 'ТАЙМЕР'}
              </div>
              <div className="font-orbitron font-bold text-lg text-cyan-400">
                {displayExercise.type === 'reps' ? (
                  `${currentReps} / ${targetReps}`
                ) : (
                  `${timerSeconds}с`
                )}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-black/50 border border-yellow-500/30">
              <div className="text-[10px] text-gray-400">ОТДЫХ</div>
              <div className="font-orbitron font-bold text-lg text-yellow-400">
                {displayExercise.restSec}с
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-black/50 border border-emerald-500/30">
              <div className="text-[10px] text-gray-400">НАГРАДЫ</div>
              <div className="font-orbitron font-bold text-xs text-emerald-400 flex items-center justify-center gap-1 mt-1">
                <span>+{displayExercise.rewards.xp} XP</span>
                <span>+{displayExercise.rewards.credits} ₢</span>
              </div>
            </div>
          </div>

          {/* MAIN INTERACTIVE ACTION BUTTONS */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {displayExercise.type === 'reps' ? (
              <>
                {/* BIG NEON REP CLICKER BUTTON */}
                <button
                  onClick={() => logRepetition(displayExercise.id)}
                  className="w-full sm:flex-1 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 hover:from-pink-500 hover:to-cyan-400 text-white font-orbitron font-black text-base sm:text-lg tracking-widest shadow-[0_0_30px_rgba(255,0,127,0.6)] active:scale-95 transition-all flex items-center justify-center gap-3 group"
                >
                  <Flame size={24} className="fill-white group-hover:scale-125 transition-transform" />
                  <span>ВЫПОЛНИТЬ ПОВТОР (+XP)</span>
                </button>

                {/* FINISH SET BUTTON */}
                <button
                  onClick={finishCurrentSet}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-black/80 hover:bg-black border-2 border-yellow-400 text-yellow-300 font-orbitron font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_15px_#ffe600] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  <span>ЗАВЕРШИТЬ ПОДХОД</span>
                </button>
              </>
            ) : (
              <>
                {/* STATIC TIMER TOGGLE BUTTON */}
                <button
                  onClick={toggleExerciseTimer}
                  className={`w-full sm:flex-1 py-4 sm:py-5 rounded-2xl font-orbitron font-black text-base sm:text-lg tracking-widest text-white shadow-[0_0_25px_rgba(0,240,255,0.6)] active:scale-95 transition-all flex items-center justify-center gap-3 ${
                    isTimerRunning
                      ? 'bg-gradient-to-r from-amber-600 to-red-600 border border-yellow-400'
                      : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 border border-cyan-400'
                  }`}
                >
                  {isTimerRunning ? <Pause size={24} /> : <Play size={24} />}
                  <span>{isTimerRunning ? 'ПАУЗА ТАЙМЕРА' : 'ЗАПУСК ТАЙМЕРА'}</span>
                </button>

                <button
                  onClick={finishCurrentSet}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-black/80 border-2 border-emerald-400 text-emerald-300 font-orbitron font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_15px_#00ff66] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  <span>ЗАЧЕСТЬ ПОДХОД</span>
                </button>
              </>
            )}
          </div>

          {/* Muscles & Joints Target Tags */}
          <div className="pt-2 border-t border-pink-500/20 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-black/40 border border-purple-500/20">
              <div className="text-pink-400 font-bold mb-1">ЦЕЛЕВЫЕ МЫШЦЫ:</div>
              <div className="flex flex-wrap gap-1.5">
                {displayExercise.targetMuscles.map(m => (
                  <span key={m} className="px-2 py-0.5 rounded bg-pink-950/60 border border-pink-500/30 text-pink-200 text-[11px]">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-purple-500/20">
              <div className="text-cyan-400 font-bold mb-1">СУСТАВЫ И СВЯЗКИ:</div>
              <div className="flex flex-wrap gap-1.5">
                {displayExercise.targetJoints.map(j => (
                  <span key={j} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 text-[11px]">
                    {j}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="p-4 rounded-xl bg-black/40 border border-pink-500/20 space-y-2 font-mono text-xs">
            <div className="font-orbitron font-bold text-white text-xs flex items-center gap-1.5">
              <Info size={15} className="text-cyan-400" />
              <span>ИНСТРУКЦИЯ ПО ВЫПОЛНЕНИЮ</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-gray-300 leading-relaxed">
              {displayExercise.instructions.map((step, idx) => (
                <li key={idx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Technique & Safety Notes */}
          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/40 text-purple-200 font-mono text-xs flex items-start gap-2.5">
            <ShieldAlert size={18} className="text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-yellow-300">Важное указание по технике: </span>
              {displayExercise.techniqueNotes}
            </div>
          </div>
        </div>
      )}

      {/* FULL DAY EXERCISE SCHEDULE LIST */}
      <div className="rounded-2xl border border-pink-500/30 bg-[#120626] p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-orbitron font-bold text-sm text-white">
            УПРАЖНЕНИЯ: {currentWorkoutDay.nameRu.toUpperCase()} ({dayExercises.length})
          </h3>
          {!isWorkoutSessionActive && (
            <button
              onClick={() => startWorkout(selectedDayId)}
              className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold shadow-[0_0_10px_#ff007f] transition-all flex items-center gap-1.5"
            >
              <Play size={14} /> Начать день
            </button>
          )}
        </div>

        <div className="space-y-2">
          {dayExercises.map((ex, index) => {
            const isCurrentlySelected = displayExercise?.id === ex.id;
            return (
              <div
                key={ex.id}
                onClick={() => {
                  setSelectedExerciseId(ex.id);
                  setActiveTab('exercise');
                }}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  isCurrentlySelected
                    ? 'bg-pink-900/30 border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'bg-black/50 border-purple-500/20 hover:border-pink-500/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-pink-950/80 border border-pink-500/40 flex items-center justify-center font-orbitron font-bold text-xs text-pink-400">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm font-orbitron">
                      {ex.name}
                    </div>
                    <div className="text-[11px] font-mono text-gray-400">
                      {ex.defaultSets} подхода × {ex.type === 'reps' ? `${ex.defaultReps} повт.` : `${ex.defaultDurationSec} сек.`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-yellow-400 font-bold hidden sm:inline">
                    +{ex.rewards.xp} XP
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
