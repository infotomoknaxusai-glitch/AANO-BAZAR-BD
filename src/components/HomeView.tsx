import React, { useState, useEffect } from 'react';
import { 
  Zap, ArrowRight, Percent, ShieldCheck, Sparkles, TrendingUp, 
  ShoppingBag, Award, Tag, Clock, ChevronRight, Store, Truck, 
  CheckCircle2, Gift, Star
} from 'lucide-react';
import { CATEGORIES, DEALS_OFFERS } from '../data.js';
import { Product, CategoryId, ActiveView, Currency } from '../types.js';
import { ProductCard } from './ProductCard.js';

interface HomeViewProps {
  products: Product[];
  currency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onNavigate: (view: ActiveView, categoryId?: CategoryId) => void;
  onOpenAiAssistant: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onSelectProduct,
  onNavigate,
  onOpenAiAssistant,
}) => {
  // Flash sale countdown timer state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

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

  const heroSlides = [
    {
      title: "The Ultimate Multi-Category Superstore",
      tagline: "GROCERY • ELECTRONICS • FASHION • BEAUTY • ACCESSORIES",
      highlight: "Save up to 30% + 15% Instant Wallet Cashback",
      bgGradient: "from-amber-950 via-slate-900 to-slate-950",
      cta: "Shop Today's Deals",
      action: () => onNavigate('deals'),
      badge: "Festive Season Superstore",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Live Flash Drops & Lightning Savings",
      tagline: "LIMITED QUANTITIES • HOURLY RESERVE TIMERS",
      highlight: "Premium Studio Audio, Himalayan Shilajit & Cashmere Drops",
      bgGradient: "from-rose-950 via-slate-900 to-slate-950",
      cta: "Explore Flash Sale",
      action: () => onNavigate('flash-sale'),
      badge: "Live Countdown",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
    },
    {
      title: "Grow Your Business on AANO BAZAR",
      tagline: "SELLER MARKETPLACE • WHOLESALE DEALER NETWORK",
      highlight: "Zero Listing Fee for 90 Days & B2B Volume Pricing Tiers",
      bgGradient: "from-emerald-950 via-slate-900 to-slate-950",
      cta: "Sell on AANO BAZAR",
      action: () => onNavigate('sell-on-aano'),
      badge: "Merchant & Wholesale Hub",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const flashSaleProducts = products.filter(p => p.isFlashSale);
  const bestSellerProducts = products.filter(p => p.isBestSeller);
  const newArrivalProducts = products.filter(p => p.isNewArrival);

  return (
    <div className="space-y-12 pb-16">
      {/* Dynamic Hero Carousel Banner */}
      <section className="max-w-7xl mx-auto px-4 pt-4">
        <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${heroSlides[activeHeroSlide].bgGradient} text-white p-8 md:p-14 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[380px]`}>
          <div className="space-y-4 max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{heroSlides[activeHeroSlide].badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {heroSlides[activeHeroSlide].title}
            </h1>

            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400">
              {heroSlides[activeHeroSlide].tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-300">
              {heroSlides[activeHeroSlide].highlight}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={heroSlides[activeHeroSlide].action}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <span>{heroSlides[activeHeroSlide].cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAiAssistant}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 backdrop-blur-md cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Ask AI Concierge</span>
              </button>
            </div>
          </div>

          <div className="relative w-full md:w-80 lg:w-96 aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
            <img
              src={heroSlides[activeHeroSlide].image}
              alt="AANO BAZAR showcase"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <div className="text-xs">
                <span className="font-bold text-amber-400 block">100% Genuine Guaranteed</span>
                <span className="text-slate-300 text-[11px]">Free delivery on orders over $35</span>
              </div>
            </div>
          </div>

          {/* Carousel Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveHeroSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeHeroSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Fast Shortcut Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Explore Our 7 Core Categories
            </h2>
            <p className="text-xs text-slate-500">From daily fresh organics to certified gadgets and artisanal fashion</p>
          </div>
          <button
            onClick={() => onNavigate('all-categories')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('category', cat.id)}
              className="group p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden mb-3 bg-slate-100 group-hover:scale-105 transition-transform">
                <img src={cat.bannerImage} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-slate-900 text-xs group-hover:text-amber-600 transition-colors line-clamp-1">
                {cat.shortName}
              </h3>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">{cat.itemCount}+ items</span>
            </button>
          ))}
        </div>
      </section>

      {/* Live Flash Sale Section with Countdown Timer */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-rose-900/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-rose-900/50 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-lg animate-bounce">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    Lightning Flash Sale
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-extrabold text-[10px] uppercase">
                    Up to 35% OFF
                  </span>
                </div>
                <p className="text-xs text-rose-200">Limited quantities remaining — claims refresh hourly</p>
              </div>
            </div>

            {/* Countdown Clock Display */}
            <div className="flex items-center gap-2 bg-slate-950/70 px-4 py-2.5 rounded-2xl border border-rose-800/40 w-max">
              <Clock className="w-4 h-4 text-rose-400" />
              <span className="text-xs uppercase font-bold text-rose-300 tracking-wider mr-2">Ends in:</span>
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold">
                <span className="bg-rose-900/80 text-rose-100 px-2 py-1 rounded-md">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-rose-900/80 text-rose-100 px-2 py-1 rounded-md">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-rose-900/80 text-rose-100 px-2 py-1 rounded-md text-amber-400 animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>

          {/* Flash Sale Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flashSaleProducts.map((product) => (
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

          <div className="text-center pt-6">
            <button
              onClick={() => onNavigate('flash-sale')}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>View All Live Flash Deals & Reserved Drops</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Deals & Coupons Voucher Strip */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Claim Active Promo Vouchers
            </h2>
            <p className="text-xs text-slate-500">Apply voucher codes at checkout for instant discounts and bonus cashback</p>
          </div>
          <button
            onClick={() => onNavigate('deals')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            <span>All Deals Hub</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEALS_OFFERS.map((deal) => (
            <div
              key={deal.id}
              className="p-4 rounded-2xl bg-white border-2 border-dashed border-amber-300 hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase tracking-wider">
                    {deal.badge}
                  </span>
                  <span className="text-base font-black text-amber-600 font-mono">{deal.discountText}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs mb-1">{deal.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{deal.subtitle}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-1 rounded text-slate-800">
                  {deal.code}
                </span>
                <button
                  onClick={() => onNavigate('deals')}
                  className="text-xs font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  Claim Voucher →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers Carousel & Showcase */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                AANO BAZAR Best Sellers
              </h2>
              <p className="text-xs text-slate-500">Highest rated & most loved products by 500,000+ verified buyers</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('best-sellers')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            <span>See Top 100</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellerProducts.map((product) => (
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
      </section>

      {/* Cashback Rewards Banner Callout */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 p-6 sm:p-10 text-white shadow-xl border border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Percent className="w-3.5 h-3.5" />
              <span>AANO Wallet Cashback Program</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Earn up to 20% Instant Digital Wallet Cashback
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              No points expiration. Real cash value credited directly upon purchase to spend on your next grocery or tech haul.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onNavigate('cashback')}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              Explore Cashback Hub
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Fresh Drops & New Arrivals
              </h2>
              <p className="text-xs text-slate-500">Newly launched product editions and reserve collections</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('new-arrivals')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All New Drops</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newArrivalProducts.map((product) => (
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
      </section>

      {/* Merchant / Dealer Callout Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sell on AANO Box */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-2 z-10">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Sell on AANO BAZAR</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reach over 500,000 active shoppers across metropolitan and regional zones. 0% commission for the first 90 days, automated fulfillment, and same-day payout settlements.
              </p>
            </div>
            <button
              onClick={() => onNavigate('sell-on-aano')}
              className="mt-4 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors w-max"
            >
              <span>Register Seller Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Become a Wholesale Dealer Box */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-4 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-2 z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Become a Wholesale Dealer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unlock wholesale margins up to 48%, 45-day credit terms, dedicated account managers, and priority pallet freight for retail shops and distributors.
              </p>
            </div>
            <button
              onClick={() => onNavigate('become-dealer')}
              className="mt-4 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors w-max"
            >
              <span>Apply for Dealer Wholesale Tier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
