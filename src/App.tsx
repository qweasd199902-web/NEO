import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { HeaderHUD } from './components/HeaderHUD';
import { Navigation, NavTabId } from './components/Navigation';
import { FloatingParticles } from './components/FloatingParticles';
import { LevelUpModal } from './components/LevelUpModal';
import { DeveloperModeModal } from './components/DeveloperModeModal';

// Views
import { HomeView } from './components/HomeView';
import { WorkoutView } from './components/WorkoutView';
import { CharacterView } from './components/CharacterView';
import { ProgressionView } from './components/ProgressionView';
import { ShopView } from './components/ShopView';
import { InventoryView } from './components/InventoryView';
import { DailyView } from './components/DailyView';
import { CalendarView } from './components/CalendarView';
import { MusicPlayerView } from './components/MusicPlayerView';
import { CustomizationView } from './components/CustomizationView';
import { SettingsView } from './components/SettingsView';

const AppContent: React.FC = () => {
  const { state } = useGame();
  const [activeTab, setActiveTab] = useState<NavTabId>('home');
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  // Render current active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigate={setActiveTab} />;
      case 'workout':
        return <WorkoutView />;
      case 'character':
        return <CharacterView />;
      case 'progression':
        return <ProgressionView />;
      case 'shop':
        return <ShopView />;
      case 'inventory':
        return <InventoryView />;
      case 'daily':
        return <DailyView />;
      case 'calendar':
        return <CalendarView />;
      case 'music':
        return <MusicPlayerView />;
      case 'customization':
        return <CustomizationView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView onNavigate={setActiveTab} />;
    }
  };

  // Theme color accents
  const getThemeClass = () => {
    switch (state.settings.theme) {
      case 'miami-vice':
        return 'theme-miami selection:bg-cyan-500 selection:text-black';
      case 'matrix':
        return 'theme-matrix selection:bg-emerald-500 selection:text-black';
      case 'outrun':
        return 'theme-outrun selection:bg-amber-500 selection:text-black';
      default:
        return 'theme-blood-dragon selection:bg-pink-500 selection:text-white';
    }
  };

  // Sync theme with document.body directly
  React.useEffect(() => {
    document.body.className = getThemeClass();
  }, [state.settings.theme]);

  // Ambient lighting overlay based on active theme
  const renderAmbientLighting = () => {
    switch (state.settings.theme) {
      case 'miami-vice':
        return (
          <>
            <div className="fixed top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-1/3 left-0 w-96 h-96 bg-pink-500/15 rounded-full blur-[120px] pointer-events-none" />
          </>
        );
      case 'matrix':
        return (
          <>
            <div className="fixed top-0 left-1/3 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
          </>
        );
      case 'outrun':
        return (
          <>
            <div className="fixed top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-b from-amber-500/20 via-red-500/15 to-transparent rounded-full blur-[100px] pointer-events-none" />
          </>
        );
      default:
        return (
          <>
            <div className="fixed top-0 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-1/3 left-0 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />
          </>
        );
    }
  };

  return (
    <div
      className={`min-h-screen text-gray-100 flex flex-col relative font-sans transition-colors duration-500 ${getThemeClass()}`}
      style={{ backgroundColor: 'var(--theme-bg, #06030e)' }}
    >
      {/* Theme Ambient Lighting */}
      {renderAmbientLighting()}

      {/* CRT Scanline Filter Overlay */}
      {state.settings.crtFilterEnabled && (
        <div className="fixed inset-0 crt-overlay z-50 pointer-events-none" />
      )}

      {/* Synthwave Retrowave Floor Grid */}
      <div className="fixed inset-x-0 bottom-0 h-64 synthwave-floor opacity-25 pointer-events-none z-0" />

      {/* Floating XP/Coins Particles */}
      <FloatingParticles />

      {/* Top Header HUD */}
      <HeaderHUD
        onOpenDevMode={() => setIsDevModalOpen(true)}
        onNavigate={setActiveTab}
      />

      {/* Navigation (Desktop Top & Mobile Dock) */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenDevMode={() => setIsDevModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5 relative z-10">
        {renderTabContent()}
      </main>

      {/* Level Up Celebratory Modal */}
      <LevelUpModal onNavigateToStats={() => setActiveTab('character')} />

      {/* Developer Mode Modal */}
      <DeveloperModeModal
        isOpen={isDevModalOpen}
        onClose={() => setIsDevModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
