import React, { useState, useEffect } from 'react';
import { 
  Zap, Clock, Flame, ShieldAlert, ArrowRight, 
  CheckCircle2, Sparkles, TrendingUp 
} from 'lucide-react';
import { Product, Currency, CategoryId, ActiveView } from '../types.js';
import { ProductCard } from './ProductCard.js';

interface FlashSaleViewProps {
  products: Product[];
  currency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onNavigate: (view: ActiveView, categoryId?: CategoryId) => void;
}

export const FlashSaleView: React.FC<FlashSaleViewProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onSelectProduct,
  onNavigate,
}) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter(p => p.isFlashSale);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Flash Sale Hero Banner with Giant Countdown */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-950 via-slate-900 to-rose-900 text-white p-8 md:p-12 shadow-2xl border border-rose-900/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/30 border border-rose-500/40 text-rose-300 font-bold text-xs uppercase tracking-wider">
              <Flame className="w-4 h-4 text-rose-400 fill-current animate-pulse" />
              <span>Limited Stock Hourly Flash Drop</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Lightning Deals & Flash Sale
            </h1>
            <p className="text-xs sm:text-sm text-rose-200 leading-relaxed">
              Steepest price drops of the day! Lock in your price before stocks are completely claimed. Inventory is reserved in your cart for 15 minutes.
            </p>
          </div>

          {/* Big Countdown Timer Card */}
          <div className="bg-slate-950/80 backdrop-blur-md p-6 rounded-3xl border border-rose-800/40 text-center space-y-3 shrink-0">
            <div className="flex items-center justify-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Current Flash Window Closes In:</span>
            </div>

            <div className="flex items-center justify-center gap-2 font-mono">
              <div className="bg-rose-950 border border-rose-800/60 p-3 rounded-2xl min-w-[70px]">
                <span className="text-3xl font-black text-white block">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] text-rose-400 font-sans uppercase">Hours</span>
              </div>
              <span className="text-2xl font-bold text-rose-400">:</span>
              <div className="bg-rose-950 border border-rose-800/60 p-3 rounded-2xl min-w-[70px]">
                <span className="text-3xl font-black text-white block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] text-rose-400 font-sans uppercase">Mins</span>
              </div>
              <span className="text-2xl font-bold text-rose-400">:</span>
              <div className="bg-rose-950 border border-rose-800/60 p-3 rounded-2xl min-w-[70px]">
                <span className="text-3xl font-black text-amber-400 block animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] text-rose-400 font-sans uppercase">Secs</span>
              </div>
            </div>

            <span className="text-[11px] text-rose-300/80 block">Next drop batch refreshes at 00:00:00</span>
          </div>
        </div>
      </div>

      {/* Live Flash Products with Claim Meters */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Live Flash Sale Inventory ({flashProducts.length} Items Active)
            </h2>
            <p className="text-xs text-slate-500">Items nearing 100% claimed will return to standard MSRP</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.map((product) => (
            <div key={product.id} className="space-y-2">
              <ProductCard
                product={product}
                currency={currency}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onSelectProduct={onSelectProduct}
              />
              {/* Claimed Meter */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Claimed: {product.flashClaimedPercent || 85}%</span>
                  <span className="text-[11px] text-rose-600 font-semibold font-mono">Only {product.stockCount} left</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${product.flashClaimedPercent || 85}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Flash Drops Teaser */}
      <div className="p-8 bg-slate-900 rounded-3xl text-white border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-black tracking-tight">Sneak Peek: Next Flash Round Drops</h3>
        </div>
        <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
          The next flash drop batch includes 4K Smart TVs, Organic Cold-Pressed Virgin Ghee, Italian Damascus Chef Knife Sets, and Flagship 5G Smartphones at up to 40% OFF.
        </p>
      </div>
    </div>
  );
};
