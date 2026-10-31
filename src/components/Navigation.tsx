import React, { useState } from 'react';
import {
  Home,
  Dumbbell,
  User,
  TrendingUp,
  ShoppingBag,
  Package,
  CheckSquare,
  Calendar,
  Music,
  Palette,
  Settings,
  Terminal,
  Menu,
  X
} from 'lucide-react';
import { useGame } from '../context/GameContext';

export type NavTabId =
  | 'home'
  | 'workout'
  | 'character'
  | 'progression'
  | 'shop'
  | 'inventory'
  | 'daily'
  | 'calendar'
  | 'music'
  | 'customization'
  | 'settings'
  | 'developer';

interface Props {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  onOpenDevMode: () => void;
}

interface TabConfig {
  id: NavTabId;
  labelRu: string;
  icon: React.ReactNode;
  badge?: number | string;
  isPrimaryDock?: boolean;
}

export const Navigation: React.FC<Props> = ({ activeTab, onSelectTab, onOpenDevMode }) => {
  const { state } = useGame();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Calculate badges
  const unspentPoints = state.unallocatedStatPoints;
  const claimableQuests = state.dailyQuests.filter(q => q.completed && !q.claimed).length;

  const tabs: TabConfig[] = [
    { id: 'home', labelRu: 'Главная', icon: <Home size={18} />, isPrimaryDock: true },
    { id: 'workout', labelRu: 'Тренировка', icon: <Dumbbell size={18} />, isPrimaryDock: true },
    { id: 'character', labelRu: 'Персонаж', icon: <User size={18} />, badge: unspentPoints > 0 ? `+${unspentPoints}` : undefined, isPrimaryDock: true },
    { id: 'progression', labelRu: 'Прокачка', icon: <TrendingUp size={18} />, isPrimaryDock: true },
    { id: 'shop', labelRu: 'Магазин', icon: <ShoppingBag size={18} /> },
    { id: 'inventory', labelRu: 'Инвентарь', icon: <Package size={18} /> },
    { id: 'daily', labelRu: 'Задания', icon: <CheckSquare size={18} />, badge: claimableQuests > 0 ? claimableQuests : undefined, isPrimaryDock: true },
    { id: 'calendar', labelRu: 'Календарь', icon: <Calendar size={18} /> },
    { id: 'music', labelRu: 'Музыка', icon: <Music size={18} /> },
    { id: 'customization', labelRu: 'Кастом', icon: <Palette size={18} /> },
    { id: 'settings', labelRu: 'Настройки', icon: <Settings size={18} /> },
    { id: 'developer', labelRu: 'Dev Mode', icon: <Terminal size={18} /> }
  ];

  const primaryDockTabs = tabs.filter(t => t.isPrimaryDock);
  const secondaryTabs = tabs.filter(t => !t.isPrimaryDock);

  const handleSelect = (id: NavTabId) => {
    if (id === 'developer') {
      onOpenDevMode();
    } else {
      onSelectTab(id);
    }
    setIsMoreMenuOpen(false);
  };

  return (
    <>
      {/* Desktop / Tablet Full Navigation Bar */}
      <nav className="hidden lg:flex items-center justify-center gap-1 bg-[#0b051e] border-b border-pink-500/20 px-2 py-1.5 overflow-x-auto">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs tracking-wider transition-all select-none whitespace-nowrap ${
                isActive
                  ? 'bg-pink-600/30 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)] font-bold'
                  : 'text-gray-400 hover:text-pink-300 hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.icon}
              <span>{tab.labelRu}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 rounded-full bg-pink-500 text-white font-mono text-[10px] font-bold shadow-[0_0_6px_#ff007f] animate-pulse">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile Android-Style Bottom Navigation Dock */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090417]/95 backdrop-blur-md border-t border-pink-500/30 px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(255,0,127,0.2)]">
        {primaryDockTabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded transition-all select-none ${
                isActive ? 'text-cyan-300 font-bold scale-105' : 'text-gray-400 hover:text-pink-300'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1 py-0.2 min-w-[14px] text-center rounded-full bg-pink-600 text-white font-mono text-[9px] font-bold shadow-[0_0_5px_#ff007f]">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono tracking-tight">{tab.labelRu}</span>
              {isActive && (
                <div className="w-5 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#00f0ff]" />
              )}
            </button>
          );
        })}

        {/* More Menu Drawer Trigger */}
        <button
          onClick={() => setIsMoreMenuOpen(prev => !prev)}
          className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded transition-all select-none ${
            isMoreMenuOpen ? 'text-pink-400' : 'text-gray-400'
          }`}
        >
          {isMoreMenuOpen ? <X size={18} /> : <Menu size={18} />}
          <span className="text-[10px] font-mono">Ещё</span>
        </button>
      </nav>

      {/* Mobile "More" Drawer Modal */}
      {isMoreMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end"
          onClick={() => setIsMoreMenuOpen(false)}
        >
          <div
            className="bg-[#0f0724] border-t-2 border-pink-500 rounded-t-2xl p-4 shadow-[0_-10px_30px_rgba(255,0,127,0.3)] pb-24"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-pink-500/20 mb-3">
              <span className="font-orbitron font-bold text-sm text-cyan-300 tracking-wider">
                КИБЕР-МОДУЛИ
              </span>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1 rounded text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {secondaryTabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelect(tab.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border font-mono text-xs transition-all ${
                      isActive
                        ? 'bg-pink-600/30 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)] font-bold'
                        : 'bg-black/50 border-purple-500/30 text-gray-300 hover:border-pink-500'
                    }`}
                  >
                    <div className="mb-1 text-pink-400">{tab.icon}</div>
                    <span>{tab.labelRu}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
