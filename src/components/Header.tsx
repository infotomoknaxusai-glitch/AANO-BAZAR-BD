import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, Search, Heart, ShoppingCart, User, 
  ChevronDown, MapPin, Tag, Zap, Percent, 
  Sparkles, TrendingUp, HelpCircle, Store, Truck, Menu, X, ArrowRight
} from 'lucide-react';
import { CATEGORIES, CURRENCIES } from '../data.js';
import { CategoryId, ActiveView, Currency, Product } from '../types.js';

interface HeaderProps {
  activeView: ActiveView;
  selectedCategory: CategoryId | null;
  onNavigate: (view: ActiveView, categoryId?: CategoryId) => void;
  onSearch: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrderTrack: () => void;
  onOpenAiAssistant: () => void;
  currency?: Currency;
  onSelectCurrency?: (c: Currency) => void;
  currencies?: Currency[];
  products?: Product[];
  onSelectProduct?: (p: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  selectedCategory,
  onNavigate,
  onSearch,
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenOrderTrack,
  onOpenAiAssistant,
  currency = CURRENCIES[0],
  onSelectCurrency,
  currencies = CURRENCIES,
  products = [],
  onSelectProduct
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState<string>('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('Kathmandu / Metro');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const activeCurrency = currency || CURRENCIES[0];
  const currencyList = currencies && currencies.length > 0 ? currencies : CURRENCIES;

  // Search suggestions
  const filteredSuggestions = searchInput.trim().length > 0 && products
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchInput.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch?.(searchInput.trim());
      setIsSearchFocused(false);
    }
  };

  const handleSelectSuggestion = (p: Product) => {
    onSelectProduct?.(p);
    setIsSearchFocused(false);
    setSearchInput('');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Notification / Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Flash Announcement Ticker */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider animate-pulse">
              <Zap className="w-2.5 h-2.5 fill-current" /> Flash Sale
            </span>
            <span className="hidden sm:inline font-medium text-slate-200">
              Get up to 30% OFF + 15% Instant Wallet Cashback today on AANO BAZAR!
            </span>
            <button 
              id="top-bar-deals-link"
              onClick={() => onNavigate('flash-sale')} 
              className="text-amber-400 hover:text-amber-300 underline font-semibold cursor-pointer ml-1"
            >
              Shop Deals
            </button>
          </div>

          {/* Quick links & Currency Selector */}
          <div className="flex items-center gap-4 text-[11px]">
            <button 
              id="nav-sell-link-top"
              onClick={() => onNavigate('sell-on-aano')}
              className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <Store className="w-3 h-3 text-amber-400" />
              <span>Sell on AANO</span>
            </button>

            <button 
              id="nav-dealer-link-top"
              onClick={() => onNavigate('become-dealer')}
              className="hover:text-amber-400 transition-colors hidden md:flex items-center gap-1 font-medium cursor-pointer"
            >
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>Become a Dealer</span>
            </button>

            <button 
              id="nav-track-order-top"
              onClick={onOpenOrderTrack}
              className="hover:text-amber-400 transition-colors hidden sm:flex items-center gap-1 cursor-pointer"
            >
              <Truck className="w-3 h-3" />
              <span>Track Order</span>
            </button>

            <button 
              id="nav-faq-top"
              onClick={() => onNavigate('faq')}
              className="hover:text-amber-400 transition-colors hidden md:flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Help & FAQ</span>
            </button>

            {/* Currency Dropdown */}
            <div className="relative">
              <button 
                id="currency-selector-button"
                onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
                className="flex items-center gap-1 text-slate-200 hover:text-white px-2 py-0.5 rounded-sm bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
              >
                <span>{activeCurrency.code} ({activeCurrency.symbol})</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {isCurrencyMenuOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white text-slate-800 rounded-md shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Select Currency</div>
                  {currencyList.map(c => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onSelectCurrency?.(c);
                        setIsCurrencyMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-amber-50 cursor-pointer ${activeCurrency.code === c.code ? 'font-bold text-amber-600 bg-amber-50/50' : ''}`}
                    >
                      <span>{c.name}</span>
                      <span className="font-mono text-slate-500 font-semibold">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3">
            <button 
              id="mobile-menu-toggle-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-md cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <button 
              id="brand-logo-button"
              onClick={() => onNavigate('home')} 
              className="text-left flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-sans">
                    AANO <span className="text-amber-600">BAZAR</span>
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-sm bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wider border border-slate-200">
                    SUPERSTORE
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block font-medium -mt-0.5">
                  Multi-Category Marketplace & Deals
                </p>
              </div>
            </button>
          </div>

          {/* Delivery Location Pill (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 text-xs">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <div className="text-left">
              <span className="text-[10px] block text-slate-500 font-medium">Deliver to</span>
              <button 
                id="header-delivery-location-btn"
                onClick={() => setIsLocationModalOpen(true)}
                className="font-bold text-slate-800 hover:text-amber-600 truncate max-w-[130px] block cursor-pointer text-left"
              >
                {deliveryLocation}
              </button>
            </div>
          </div>

          {/* Global Smart Search Bar */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative flex-1 flex items-center">
                <input
                  id="global-search-input"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search Grocery, Electronics, Fashion, Beauty, Gadgets..."
                  className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-100/90 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                
                {/* AI Assistant Quick Prompt */}
                <button
                  id="search-ai-assist-btn"
                  type="button"
                  onClick={onOpenAiAssistant}
                  className="absolute right-2 sm:right-3 px-2 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-800 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Ask AANO AI Concierge for recommendations"
                >
                  <Sparkles className="w-3 h-3 text-amber-600 fill-amber-600" />
                  <span className="hidden sm:inline">AI Help</span>
                </button>
              </div>
            </form>

            {/* Live Autocomplete Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-2xl border border-slate-200 py-3 z-50 max-h-96 overflow-y-auto">
                {searchInput.trim() ? (
                  <div>
                    <div className="px-4 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Products matching "{searchInput}"</span>
                      <span className="text-[10px] text-slate-400">{filteredSuggestions.length} found</span>
                    </div>
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelectSuggestion(item)}
                          className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-amber-50/70 transition-colors cursor-pointer border-b border-slate-100 last:border-0"
                        >
                          <img 
                            src={item.images[0]} 
                            alt={item.name} 
                            className="w-10 h-10 object-cover rounded-md bg-slate-100 shrink-0" 
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span className="text-amber-600 font-bold">{activeCurrency.symbol}{(item.price * activeCurrency.rate).toFixed(2)}</span>
                              <span>•</span>
                              <span className="text-[11px] bg-slate-100 px-1.5 py-0.2 rounded text-slate-600">{item.categoryName}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-sm text-slate-500">
                        No direct match found for "{searchInput}". Press Enter to view all related catalog results.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="px-2 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Popular Categories & Trending Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5 px-2 mb-3">
                      {['Himalayan Basmati', 'ANC Headphones', 'Goodyear Boots', 'Shilajit Resin', 'GaN Charger', 'Cast Iron Dutch Oven', 'Cashmere Shawl'].map(term => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchInput(term);
                            onSearch(term);
                            setIsSearchFocused(false);
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 rounded-full text-xs font-medium cursor-pointer transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-slate-100 pt-2 px-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Need intelligent shopping recommendations?</span>
                        <button 
                          onClick={() => {
                            setIsSearchFocused(false);
                            onOpenAiAssistant();
                          }}
                          className="text-amber-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" /> Ask AanoBot AI
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons: Wishlist, Cart, AI Assistant, User */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* AI Assistant Floating Button in Header */}
            <button
              id="header-ai-concierge-btn"
              onClick={onOpenAiAssistant}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
              title="AANO AI Shopping Concierge"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden md:inline text-xs font-bold tracking-wide">AI Concierge</span>
            </button>

            {/* Wishlist Button */}
            <button 
              id="header-wishlist-button"
              onClick={onOpenWishlist}
              className="p-2 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg relative transition-colors cursor-pointer"
              title="View Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button 
              id="header-cart-button"
              onClick={onOpenCart}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer relative border border-slate-200 bg-white"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-slate-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-slate-800">
                Cart {cartCount > 0 ? `(${cartCount})` : ''}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar: All Categories dropdown, Category Links, Deals, Flash Sale, Cashback, Sellers */}
      <nav className="bg-slate-50 border-t border-slate-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* All Categories Dropdown Trigger */}
            <div className="relative">
              <button 
                id="nav-all-categories-btn"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wide uppercase transition-colors cursor-pointer ${
                  activeView === 'all-categories' || isCategoryMenuOpen
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <Menu className="w-4 h-4" />
                <span>All Categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* Mega Categories Dropdown */}
              {isCategoryMenuOpen && (
                <div 
                  className="absolute left-0 top-full mt-0 w-72 bg-white rounded-b-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setIsCategoryMenuOpen(false)}
                >
                  <div className="px-4 py-1.5 text-[11px] font-bold uppercase text-slate-400 tracking-wider border-b border-slate-100">
                    Department Directories
                  </div>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onNavigate('category', cat.id);
                        setIsCategoryMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono font-normal">{cat.itemCount}+</span>
                    </button>
                  ))}
                  <div className="p-2 border-t border-slate-100 bg-slate-50/70 mt-1">
                    <button
                      onClick={() => {
                        onNavigate('all-categories');
                        setIsCategoryMenuOpen(false);
                      }}
                      className="w-full py-1.5 text-center text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-100/70 hover:bg-amber-100 rounded-md transition-colors cursor-pointer"
                    >
                      View Full Category Directory →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Individual Category Quick Links */}
            <div className="flex items-center">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  id={`nav-cat-${cat.id}`}
                  onClick={() => onNavigate('category', cat.id)}
                  className={`px-3 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    activeView === 'category' && selectedCategory === cat.id
                      ? 'text-amber-600 font-bold border-b-2 border-amber-600 bg-white'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-slate-100/80'
                  }`}
                >
                  {cat.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Deals, Flash Sale, Cashback, New Arrivals, Best Sellers Badges */}
          <div className="flex items-center gap-1">
            <button
              id="nav-deals-button"
              onClick={() => onNavigate('deals')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                activeView === 'deals' ? 'bg-amber-100 text-amber-900' : 'text-slate-700 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>Deals</span>
            </button>

            <button
              id="nav-flash-sale-button"
              onClick={() => onNavigate('flash-sale')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                activeView === 'flash-sale' ? 'bg-rose-100 text-rose-900' : 'text-rose-600 hover:bg-rose-50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-rose-600 text-rose-600 animate-bounce" />
              <span>Flash Sale</span>
            </button>

            <button
              id="nav-cashback-button"
              onClick={() => onNavigate('cashback')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                activeView === 'cashback' ? 'bg-emerald-100 text-emerald-900' : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Percent className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cashback</span>
            </button>

            <button
              id="nav-new-arrivals-button"
              onClick={() => onNavigate('new-arrivals')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer ${
                activeView === 'new-arrivals' ? 'font-bold text-indigo-700 bg-indigo-50' : ''
              }`}
            >
              <span>New Arrivals</span>
            </button>

            <button
              id="nav-best-sellers-button"
              onClick={() => onNavigate('best-sellers')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer ${
                activeView === 'best-sellers' ? 'font-bold text-amber-800 bg-amber-50' : ''
              }`}
            >
              <span>Best Sellers</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full overflow-y-auto p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="font-black text-slate-900">AANO BAZAR</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Special Promos & Deals */}
              <div className="py-3 border-b border-slate-100 flex flex-col gap-1">
                <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1">Specials & Rewards</div>
                <button 
                  onClick={() => { onNavigate('flash-sale'); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 py-2 px-2 text-rose-600 font-bold text-sm hover:bg-rose-50 rounded-md"
                >
                  <Zap className="w-4 h-4 fill-current" /> Flash Sale (Live Countdown)
                </button>
                <button 
                  onClick={() => { onNavigate('cashback'); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 py-2 px-2 text-emerald-700 font-bold text-sm hover:bg-emerald-50 rounded-md"
                >
                  <Percent className="w-4 h-4" /> Cashback Hub (Up to 20%)
                </button>
                <button 
                  onClick={() => { onNavigate('deals'); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 py-2 px-2 text-amber-700 font-bold text-sm hover:bg-amber-50 rounded-md"
                >
                  <Tag className="w-4 h-4" /> Deals & Promo Vouchers
                </button>
                <button 
                  onClick={() => { onNavigate('new-arrivals'); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 py-2 px-2 text-slate-800 font-semibold text-sm hover:bg-slate-100 rounded-md"
                >
                  <Sparkles className="w-4 h-4 text-indigo-500" /> New Arrivals
                </button>
                <button 
                  onClick={() => { onNavigate('best-sellers'); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-2 py-2 px-2 text-slate-800 font-semibold text-sm hover:bg-slate-100 rounded-md"
                >
                  <TrendingUp className="w-4 h-4 text-amber-600" /> Best Sellers
                </button>
              </div>

              {/* Categories */}
              <div className="py-3 border-b border-slate-100">
                <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1">Categories</div>
                <button 
                  onClick={() => { onNavigate('all-categories'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-2 px-2 text-sm font-bold text-amber-600 hover:bg-amber-50 rounded-md"
                >
                  View All Categories Directory →
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { onNavigate('category', cat.id); setIsMobileMenuOpen(false); }}
                    className="w-full text-left py-2 px-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-400">{cat.itemCount}+</span>
                  </button>
                ))}
              </div>

              {/* Seller / Dealer */}
              <div className="py-3 border-b border-slate-100">
                <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1">Merchant Hub</div>
                <button 
                  onClick={() => { onNavigate('sell-on-aano'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-2 px-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-md flex items-center gap-2"
                >
                  <Store className="w-4 h-4 text-amber-600" /> Sell on AANO BAZAR
                </button>
                <button 
                  onClick={() => { onNavigate('become-dealer'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-2 px-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-md flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-600" /> Become a Wholesale Dealer
                </button>
              </div>

              {/* Customer Care */}
              <div className="py-3">
                <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider mb-1">Customer Support</div>
                <button 
                  onClick={() => { onNavigate('about-us'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-1.5 px-2 text-xs text-slate-600 hover:text-slate-900"
                >
                  About Us
                </button>
                <button 
                  onClick={() => { onNavigate('contact-us'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-1.5 px-2 text-xs text-slate-600 hover:text-slate-900"
                >
                  Contact & Support
                </button>
                <button 
                  onClick={() => { onNavigate('faq'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-1.5 px-2 text-xs text-slate-600 hover:text-slate-900"
                >
                  FAQ & Guides
                </button>
                <button 
                  onClick={() => { onNavigate('return-policy'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-1.5 px-2 text-xs text-slate-600 hover:text-slate-900"
                >
                  Return & Refund Policy
                </button>
                <button 
                  onClick={() => { onNavigate('delivery-policy'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left py-1.5 px-2 text-xs text-slate-600 hover:text-slate-900"
                >
                  Delivery Policy & Rates
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAiAssistant();
                }}
                className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AANO AI Concierge</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span>Select Delivery Destination</span>
              </h3>
              <button onClick={() => setIsLocationModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2 mb-4">
              Choose your city or enter your pincode to unlock 2-hour express grocery delivery and precise shipping times.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {['Kathmandu / Bagmati', 'Pokhara / Gandaki', 'Biratnagar / Koshi', 'Mumbai / Maharashtra', 'Delhi / NCR', 'New York / Metro'].map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    setDeliveryLocation(loc);
                    setIsLocationModalOpen(false);
                  }}
                  className={`p-2.5 text-xs text-left rounded-lg border transition-all cursor-pointer ${
                    deliveryLocation === loc ? 'border-amber-600 bg-amber-50 font-bold text-amber-900' : 'border-slate-200 hover:border-slate-400 text-slate-700'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 cursor-pointer"
            >
              Confirm Delivery Zone
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
