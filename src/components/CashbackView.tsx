import React, { useState } from 'react';
import { 
  Percent, Wallet, Sparkles, Award, ShieldCheck, 
  ArrowRight, Check, DollarSign, ArrowUpRight 
} from 'lucide-react';
import { Product, Currency, CategoryId, ActiveView } from '../types.js';
import { ProductCard } from './ProductCard.js';

interface CashbackViewProps {
  products: Product[];
  currency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onNavigate: (view: ActiveView, categoryId?: CategoryId) => void;
}

export const CashbackView: React.FC<CashbackViewProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onSelectProduct,
  onNavigate,
}) => {
  const [calcAmount, setCalcAmount] = useState<number>(250);

  const highCashbackProducts = products.filter(p => p.cashbackPercent >= 10);

  const tiers = [
    { name: 'Bronze Member', spend: 'Orders up to $100', rate: 5, color: 'from-amber-800 to-amber-600', perks: ['5% on Groceries & Essentials', 'Standard 24-hr Delivery'] },
    { name: 'Silver Shopper', spend: '$100 - $500 monthly', rate: 10, color: 'from-slate-600 to-slate-400', perks: ['10% on Electronics & Fashion', 'Free Express Shipping', 'Priority Packing'] },
    { name: 'Gold VIP', spend: '$500 - $1,500 monthly', rate: 15, color: 'from-amber-600 to-amber-400', perks: ['15% on All 7 Categories', '2-Hour Instant Dispatch', 'Dedicated AI Stylist'] },
    { name: 'Platinum Elite', spend: '$1,500+ or Dealer Tier', rate: 20, color: 'from-indigo-800 to-purple-600', perks: ['20% Maximum Cashback', 'Wholesale Pricing Access', 'Personal Concierge 24/7'] }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-8 md:p-12 shadow-2xl border border-emerald-800/40">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
            <Percent className="w-3.5 h-3.5" />
            <span>AANO Digital Wallet Rewards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Earn up to 20% Direct Wallet Cashback
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Unlike points systems that expire or require confusing conversions, AANO BAZAR Cashback is real currency credited instantly into your AANO Wallet upon checkout. Use it immediately to offset groceries, gadgets, and apparel.
          </p>
        </div>
      </div>

      {/* Interactive Cashback Calculator */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Interactive Cashback Earnings Calculator</h2>
          <p className="text-xs text-slate-500">Estimate how much digital cash you will earn on your next purchase</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Estimated Cart Total:</span>
            <span className="text-lg font-black text-amber-600 font-mono">
              {currency.symbol}{(calcAmount * currency.rate).toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="1500"
            step="10"
            value={calcAmount}
            onChange={(e) => setCalcAmount(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Calculated Tier Returns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {tiers.map((tier) => {
            const earned = ((calcAmount * (tier.rate / 100)) * currency.rate).toFixed(2);
            return (
              <div
                key={tier.name}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${tier.color} mb-3`} />
                  <h4 className="font-bold text-slate-900 text-sm">{tier.name}</h4>
                  <span className="text-xs text-slate-500 font-semibold block">{tier.rate}% Cashback Tier</span>
                  <p className="text-[11px] text-slate-400 mt-1">{tier.spend}</p>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">You Will Earn:</span>
                  <span className="text-xl font-black text-emerald-600 font-mono">
                    +{currency.symbol}{earned}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Membership Tier Cards */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          AANO VIP Reward Tiers & Benefits
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-400 transition-colors"
            >
              <div className="space-y-3">
                <div className={`p-3 rounded-2xl bg-gradient-to-tr ${tier.color} text-white w-max font-bold text-sm shadow-sm`}>
                  {tier.rate}%
                </div>
                <h3 className="font-bold text-slate-900 text-base">{tier.name}</h3>
                <span className="text-xs text-slate-500 block font-medium">{tier.spend}</span>
                <ul className="space-y-1.5 text-xs text-slate-600 pt-2">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High Cashback Featured Products */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Top Cashback Products (10% to 20% Return)
            </h2>
            <p className="text-xs text-slate-500">Buy now and receive highest wallet credits upon checkout</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highCashbackProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
