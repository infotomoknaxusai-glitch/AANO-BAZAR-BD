import React, { useState } from 'react';
import { 
  Tag, Copy, Check, Gift, Percent, Zap, 
  ArrowRight, ShieldCheck, Clock, Sparkles 
} from 'lucide-react';
import { DEALS_OFFERS } from '../data.js';
import { Product, Currency, CategoryId, ActiveView } from '../types.js';
import { ProductCard } from './ProductCard.js';

interface DealsViewProps {
  products: Product[];
  currency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onNavigate: (view: ActiveView, categoryId?: CategoryId) => void;
}

export const DealsView: React.FC<DealsViewProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onSelectProduct,
  onNavigate,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  // Products with high discounts (>20%)
  const dealProducts = products.filter(p => p.discountPercent >= 20);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Deals Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white p-8 md:p-12 shadow-2xl border border-amber-800/40">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
            <Tag className="w-3.5 h-3.5" />
            <span>AANO BAZAR Promo Central</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Deals, Coupons & Exclusive Vouchers
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Copy active promo codes below to redeem instant savings on checkout. Stack deals with AANO Digital Wallet Cashback for maximum reward benefits!
          </p>
        </div>
      </div>

      {/* Coupon Vouchers Grid */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Active Sitewide & Category Vouchers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEALS_OFFERS.map((deal) => (
            <div
              key={deal.id}
              className="p-6 rounded-3xl bg-white border-2 border-dashed border-amber-300 hover:border-amber-500 hover:shadow-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs uppercase">
                    {deal.badge}
                  </span>
                  <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {deal.expiresIn}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900">{deal.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm">{deal.subtitle}</p>
                <p className="text-[10px] text-slate-400 font-medium">Terms: {deal.terms}</p>
              </div>

              {/* Voucher Action Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center sm:w-48 shrink-0 space-y-2">
                <span className="text-2xl font-black text-amber-600 font-mono block">
                  {deal.discountText}
                </span>

                <button
                  onClick={() => handleCopy(deal.code)}
                  className={`w-full py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                    copiedCode === deal.code
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950'
                  }`}
                >
                  {copiedCode === deal.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{deal.code}</span>
                    </>
                  )}
                </button>
                <span className="text-[10px] text-slate-400 block font-medium">Min spend ${deal.minSpend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mega Discount Products Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Featured Discounted Products (20%–35% OFF)
            </h2>
            <p className="text-xs text-slate-500">Handpicked high-value savings across all 7 departments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dealProducts.map((product) => (
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
