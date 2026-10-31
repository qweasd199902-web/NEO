import React from 'react';
import { useGame } from '../context/GameContext';

export const FloatingParticles: React.FC = () => {
  const { floatingTexts } = useGame();

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {floatingTexts.map(item => (
        <div
          key={item.id}
          className="absolute font-orbitron font-bold text-sm md:text-base tracking-wider drop-shadow-[0_0_10px_currentColor] animate-[floatUp_1.2s_ease-out_forwards]"
          style={{
            left: `${Math.max(20, Math.min(window.innerWidth - 120, item.x - 40))}px`,
            top: `${Math.max(40, item.y - 30)}px`,
            color: item.color
          }}
        >
          {item.text}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translateY(-35px) scale(1.15);
          }
          100% {
            opacity: 0;
            transform: translateY(-70px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};
