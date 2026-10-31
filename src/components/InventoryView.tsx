import React from 'react';
import { useGame } from '../context/GameContext';
import { Package, Flame, Clock, Check, Sparkles } from 'lucide-react';

export const InventoryView: React.FC = () => {
  const { state, equipShopItem } = useGame();

  const unlockedItems = state.shopItems.filter(item => item.unlocked);

  const isEquipped = (itemId: string, category: string) => {
    if (category === 'skin') return state.equippedSkin === itemId;
    if (category === 'aura') return state.equippedAura === itemId;
    if (category === 'theme') return state.equippedTheme === itemId;
    if (category === 'accessory') return state.equippedAccessories.includes(itemId);
    return false;
  };

  return (
    <div className="space-y-6 pb-24">
      {/* ACTIVE BUFFS HUD */}
      <div className="space-y-3">
        <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
          <Flame size={18} className="text-yellow-400" />
          <span>АКТИВНЫЕ СТИМУЛЯТОРЫ И БАФЫ</span>
        </h2>

        {state.activeBuffs.length === 0 ? (
          <div className="p-4 rounded-xl bg-black/40 border border-purple-500/20 text-center font-mono text-xs text-gray-400">
            Нет активных стимуляторов. Приобретайте нанит-инъекторы опыта и кредитов в Кибер-Маркете.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {state.activeBuffs.map(buff => {
              const remainingSec = Math.max(0, Math.floor((buff.expiresAt - Date.now()) / 1000));
              const mins = Math.floor(remainingSec / 60);
              const secs = remainingSec % 60;

              return (
                <div
                  key={buff.id}
                  className="p-3.5 rounded-xl bg-yellow-950/30 border border-yellow-400/50 flex items-center justify-between gap-3 shadow-[0_0_12px_rgba(255,230,0,0.15)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{buff.icon}</div>
                    <div>
                      <div className="font-orbitron font-bold text-xs text-yellow-300">
                        {buff.name}
                      </div>
                      <div className="text-[11px] font-mono text-gray-300">
                        Множитель: {buff.multiplier}x
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs text-yellow-400 font-bold bg-black/60 px-2 py-1 rounded border border-yellow-500/40">
                    <Clock size={13} />
                    <span>
                      {mins}:{secs < 10 ? `0${secs}` : secs}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* OWNED GEAR & COSMETICS */}
      <div className="space-y-3">
        <h2 className="font-orbitron font-bold text-base text-white flex items-center gap-2">
          <Package size={18} className="text-cyan-400" />
          <span>ЭКИПИРОВКА В ИНВЕНТАРЕ ({unlockedItems.length})</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {unlockedItems.map(item => {
            const equipped = isEquipped(item.id, item.category);

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                  equipped
                    ? 'bg-pink-950/30 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'bg-black/40 border-purple-500/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-black/60 border border-pink-500/30 flex items-center justify-center text-xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-orbitron font-bold text-xs text-white">
                      {item.name}
                    </div>
                    <div className="text-[10px] font-mono text-gray-400">
                      {item.category.toUpperCase()}
                    </div>
                  </div>
                </div>

                {item.category !== 'buff' && (
                  <button
                    onClick={() => equipShopItem(item.id)}
                    className={`px-2.5 py-1 rounded font-mono text-xs font-bold transition-all ${
                      equipped
                        ? 'bg-cyan-950 border border-cyan-400 text-cyan-300'
                        : 'bg-purple-600/30 border border-purple-500 text-purple-300 hover:text-white'
                    }`}
                  >
                    {equipped ? 'СНЯТЬ' : 'НАДЕТЬ'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
