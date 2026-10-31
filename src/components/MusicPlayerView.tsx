import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { soundFx } from '../utils/soundEffects';
import { AudioTrack } from '../types';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Upload,
  Trash2,
  Music,
  Disc,
  Radio,
  Repeat,
  Shuffle
} from 'lucide-react';

export const MusicPlayerView: React.FC = () => {
  const { state, updateSettings, showFloatingNotice } = useGame();

  const [tracks, setTracks] = useState<AudioTrack[]>([
    {
      id: 'synth_1',
      title: 'Blood Dragon Pulse 1984',
      artist: 'Rex Colt FM (Web Audio Synth)',
      durationSec: 180,
      type: 'synth'
    },
    {
      id: 'synth_2',
      title: 'Neon Highway Hyperdrive',
      artist: 'Outrun Wave (Procedural)',
      durationSec: 210,
      type: 'synth'
    },
    {
      id: 'synth_3',
      title: 'Cybernetic Tendon Surge',
      artist: 'Bionic BPM (Synthesizer)',
      durationSec: 240,
      type: 'synth'
    }
  ]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [beatPulse, setBeatPulse] = useState(0);
  const [customAudioEl, setCustomAudioEl] = useState<HTMLAudioElement | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Sync synthesizer beat with visualizer bars
  useEffect(() => {
    soundFx.onBeatCallback = (step: number) => {
      setBeatPulse(step);
    };
    return () => {
      soundFx.onBeatCallback = null;
      soundFx.stopProceduralSynthwave();
      if (customAudioEl) {
        customAudioEl.pause();
      }
    };
  }, [customAudioEl]);

  const playTrack = (index: number) => {
    const track = tracks[index];
    if (!track) return;

    soundFx.initContext();
    setCurrentTrackIndex(index);
    setIsPlaying(true);

    if (customAudioEl) {
      customAudioEl.pause();
    }

    if (track.type === 'synth') {
      soundFx.startProceduralSynthwave(track.id);
      showFloatingNotice(`ТРЕК АКТИВИРОВАН: ${track.title}`, '#00f0ff');
    } else if (track.audioUrl) {
      soundFx.stopProceduralSynthwave();
      const audio = new Audio(track.audioUrl);
      audio.volume = state.settings.masterVolume * state.settings.musicVolume;
      audio.onended = () => handleNext();
      audio.play().catch(e => console.warn('Audio play restricted', e));
      setCustomAudioEl(audio);
      showFloatingNotice(`ИГРАЕТ ФАЙЛ: ${track.title}`, '#00f0ff');
    }
  };

  const togglePlayPause = () => {
    soundFx.initContext();
    if (isPlaying) {
      setIsPlaying(false);
      soundFx.stopProceduralSynthwave();
      if (customAudioEl) {
        customAudioEl.pause();
      }
    } else {
      playTrack(currentTrackIndex);
    }
  };

  const handleNext = () => {
    let nextIdx = (currentTrackIndex + 1) % tracks.length;
    if (isShuffle && tracks.length > 1) {
      nextIdx = Math.floor(Math.random() * tracks.length);
    }
    playTrack(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIdx);
  };

  // Upload custom MP3 from phone
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newTracks: AudioTrack[] = [];
    Array.from(files).forEach((file, i) => {
      const url = URL.createObjectURL(file);
      newTracks.push({
        id: `custom_${Date.now()}_${i}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: 'Собственный трек с телефона',
        durationSec: 180,
        type: 'custom',
        audioUrl: url
      });
    });

    setTracks(prev => [...prev, ...newTracks]);
    showFloatingNotice(`ДОБАВЛЕНО ${newTracks.length} ТРЕКОВ`, '#00ff66');
  };

  const removeTrack = (trackId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTracks(prev => prev.filter(t => t.id !== trackId));
    if (currentTrack?.id === trackId) {
      soundFx.stopProceduralSynthwave();
      if (customAudioEl) customAudioEl.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    updateSettings({ musicVolume: val });
    soundFx.setVolumes(state.settings.masterVolume, state.settings.sfxVolume, val);
    if (customAudioEl) {
      customAudioEl.volume = state.settings.masterVolume * val;
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Player Main Cyber Cassette / Turntable */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#17052e] via-[#24083a] to-[#0c031a] border-2 border-pink-500/50 shadow-[0_0_30px_rgba(255,0,127,0.3)] space-y-5">
        <div className="flex items-center justify-between border-b border-pink-500/20 pb-3">
          <div className="flex items-center gap-2 text-pink-400 font-mono text-xs font-bold">
            <Radio size={16} />
            <span>SYNTHWAVE FM: CYBERPUNK 1984</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-cyan-400 text-cyan-300">
            100% ОФЛАЙН
          </span>
        </div>

        {/* Cassette / Disc Visualizer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
          <div className="relative w-36 h-36 rounded-full border-4 border-pink-500 bg-black/80 flex items-center justify-center shadow-[0_0_25px_rgba(255,0,127,0.5)]">
            <div
              className={`w-28 h-28 rounded-full border-2 border-cyan-400/60 bg-gradient-to-tr from-purple-900 to-black flex items-center justify-center ${
                isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
              }`}
            >
              <Disc size={36} className="text-yellow-400" />
            </div>
            <div className="absolute w-6 h-6 rounded-full bg-pink-500 shadow-[0_0_10px_#ff007f]" />
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
              {currentTrack.type === 'synth' ? 'ВСТРОЕННЫЙ СИНТЕЗАТОР' : 'ЛОКАЛЬНЫЙ АУДИОФАЙЛ'}
            </div>
            <h2 className="font-orbitron font-black text-lg sm:text-xl text-white">
              {currentTrack.title}
            </h2>
            <div className="font-mono text-xs text-gray-400">{currentTrack.artist}</div>

            {/* Beat-Synchronized Equalizer Bars */}
            <div className="flex items-end justify-center sm:justify-start gap-1 h-8 pt-2">
              {[40, 75, 100, 60, 85, 45, 90, 70, 50, 95].map((h, i) => {
                const dynamicHeight = isPlaying
                  ? Math.max(20, Math.min(100, h * (0.4 + 0.6 * Math.abs(Math.sin((beatPulse + i) * 0.9)))))
                  : 15;
                return (
                  <div
                    key={i}
                    className="w-1.5 rounded-t bg-gradient-to-t from-pink-600 to-cyan-400 transition-all duration-100"
                    style={{ height: `${dynamicHeight}%` }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center gap-4 pt-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsShuffle(prev => !prev)}
              className={`p-2 rounded-lg transition-colors ${
                isShuffle ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/40' : 'text-gray-500'
              }`}
              title="Перемешать"
            >
              <Shuffle size={16} />
            </button>

            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-black/60 border border-purple-500/40 text-white hover:border-pink-500 transition-colors"
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,0,127,0.7)] hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5 fill-white" />}
            </button>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-black/60 border border-purple-500/40 text-white hover:border-pink-500 transition-colors"
            >
              <SkipForward size={18} />
            </button>

            <button
              onClick={() => setIsRepeat(prev => !prev)}
              className={`p-2 rounded-lg transition-colors ${
                isRepeat ? 'text-pink-400 bg-pink-950/60 border border-pink-500/40' : 'text-gray-500'
              }`}
              title="Повтор"
            >
              <Repeat size={16} />
            </button>
          </div>

          {/* Volume slider */}
          <div className="flex items-center gap-3 w-full max-w-xs font-mono text-xs text-gray-400">
            <Volume2 size={16} className="text-cyan-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={state.settings.musicVolume}
              onChange={handleVolumeChange}
              className="w-full accent-pink-500 cursor-pointer"
            />
            <span className="w-8 text-right">{Math.round(state.settings.musicVolume * 100)}%</span>
          </div>
        </div>
      </div>

      {/* PLAYLIST & LOCAL MP3 IMPORT */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-purple-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-orbitron font-bold text-sm text-white flex items-center gap-2">
              <Music size={16} className="text-pink-400" />
              <span>ЛОКАЛЬНАЯ МЕДИАТЕКА ({tracks.length} ТРЕКОВ)</span>
            </h3>
            <p className="font-mono text-xs text-gray-400">
              Выбирайте любые MP3 или аудиофайлы со своего устройства без интернета.
            </p>
          </div>

          {/* Hidden File Input & Upload Trigger */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-mono text-xs font-bold hover:shadow-[0_0_12px_#ff007f] transition-all flex items-center gap-2 self-start"
          >
            <Upload size={14} />
            <span>Добавить музыку из телефона</span>
          </button>
        </div>

        {/* Tracks List */}
        <div className="space-y-2">
          {tracks.map((track, idx) => {
            const isCurrent = currentTrackIndex === idx;

            return (
              <div
                key={track.id}
                onClick={() => playTrack(idx)}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-pink-950/40 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : 'bg-black/40 border-purple-500/20 hover:border-pink-500/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/60 border border-pink-500/30 flex items-center justify-center font-orbitron font-bold text-xs text-pink-400">
                    {isCurrent && isPlaying ? (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <div>
                    <div className="font-orbitron font-bold text-xs text-white">
                      {track.title}
                    </div>
                    <div className="text-[11px] font-mono text-gray-400">
                      {track.artist}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 border border-purple-500/30 text-purple-300">
                    {track.type === 'synth' ? 'SYNTH' : 'LOCAL MP3'}
                  </span>
                  {track.type === 'custom' && (
                    <button
                      onClick={e => removeTrack(track.id, e)}
                      className="p-1 rounded text-gray-500 hover:text-red-400"
                      title="Удалить из плейлиста"
                    >
                      <Trash2 size={14} />
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
