import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ShoppingBag, Sparkles, Check, Flame, Zap } from 'lucide-react';

export const ShopView: React.FC = () => {
  const { state, buyShopItem, equipShopItem } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'skin' | 'aura' | 'accessory' | 'theme' | 'buff'>('all');

  const categories: { id: typeof selectedCategory; labelRu: string }[] = [
    { id: 'all', labelRu: 'Все' },
    { id: 'skin', labelRu: 'Скины' },
    { id: 'aura', labelRu: 'Ауры' },
    { id: 'accessory', labelRu: 'Аксессуары' },
    { id: 'theme', labelRu: 'Темы' },
    { id: 'buff', labelRu: 'Усилители' }
  ];

  const filteredItems = state.shopItems.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const isEquipped = (itemId: string, category: string) => {
    if (category === 'skin') return state.equippedSkin === itemId;
    if (category === 'aura') return state.equippedAura === itemId;
    if (category === 'theme') return state.equippedTheme === itemId;
    if (category === 'accessory') return state.equippedAccessories.includes(itemId);
    return false;
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Black Market Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1b0635] via-[#24083a] to-[#0c031c] border border-pink-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_25px_rgba(255,0,127,0.2)]">
        <div>
          <h1 className="font-orbitron font-black text-xl text-white flex items-center gap-2">
            <ShoppingBag size={22} className="text-pink-500" />
            <span>КИБЕР-МАРКЕТ 1984</span>
          </h1>
          <p className="font-mono text-xs text-gray-400">
            Локальный магазин экипировки, неоновых визуалов и стимуляторов.
          </p>
        </div>

        {/* Currency balances */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-yellow-400 text-yellow-300 font-mono text-sm font-bold shadow-[0_0_10px_rgba(255,230,0,0.3)]">
            ₢ {state.credits.toLocaleString()}
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-cyan-400 text-cyan-300 font-mono text-sm font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            💎 {state.tokens}
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === c.id
                ? 'bg-pink-600 text-white border border-cyan-400 shadow-[0_0_10px_#ff007f] font-bold'
                : 'bg-black/50 text-gray-400 border border-purple-500/20 hover:text-white'
            }`}
          >
            {c.labelRu}
          </button>
        ))}
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredItems.map(item => {
          const equipped = isEquipped(item.id, item.category);
          const canAfford = state.credits >= item.priceCredits && state.tokens >= item.priceTokens;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
                equipped
                  ? 'bg-pink-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : item.unlocked
                  ? 'bg-black/50 border-purple-500/40'
                  : 'bg-black/40 border-purple-500/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-black/60 border border-pink-500/40 flex items-center justify-center text-2xl shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-orbitron font-bold text-xs text-white">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                      {item.category.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-gray-300 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-xs">
                <div>
                  {!item.unlocked ? (
                    <div className="flex items-center gap-2">
                      {item.priceCredits > 0 && (
                        <span className="text-yellow-400 font-bold">{item.priceCredits} ₢</span>
                      )}
                      {item.priceTokens > 0 && (
                        <span className="text-cyan-400 font-bold">{item.priceTokens} 💎</span>
                      )}
                      {item.priceCredits === 0 && item.priceTokens === 0 && (
                        <span className="text-emerald-400 font-bold">БЕСПЛАТНО</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                      <Check size={14} /> КУПЛЕНО
                    </span>
                  )}
                </div>

                <div>
                  {item.unlocked ? (
                    item.category === 'buff' ? (
                      <button
                        onClick={() => buyShopItem(item.id)}
                        disabled={!canAfford}
                        className="px-3 py-1 rounded bg-yellow-500 text-black font-orbitron font-bold text-[11px] hover:bg-yellow-400 transition-all flex items-center gap-1"
                      >
                        <Flame size={12} /> КУПИТЬ ЕЩЁ
                      </button>
                    ) : (
                      <button
                        onClick={() => equipShopItem(item.id)}
                        className={`px-3 py-1 rounded font-orbitron font-bold text-[11px] transition-all ${
                          equipped
                            ? 'bg-cyan-950 border border-cyan-400 text-cyan-300'
                            : 'bg-purple-600 hover:bg-purple-500 text-white'
                        }`}
                      >
                        {equipped ? 'НАДЕТО' : 'НАДЕТЬ'}
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => buyShopItem(item.id)}
                      disabled={!canAfford}
                      className={`px-3 py-1 rounded font-orbitron font-bold text-[11px] transition-all ${
                        canAfford
                          ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border border-cyan-400 shadow-[0_0_8px_#ff007f] hover:scale-105 active:scale-95'
                          : 'bg-black/30 border border-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                      }`}
                    >
                      КУПИТЬ
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
