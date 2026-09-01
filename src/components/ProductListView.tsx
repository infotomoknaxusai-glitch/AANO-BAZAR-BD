import React, { useState, useMemo } from 'react';
import { 
  Filter, SlidersHorizontal, ArrowUpDown, X, Star, 
  Percent, Zap, ShoppingBag, Check
} from 'lucide-react';
import { Product, Currency, CategoryId, ActiveView } from '../types.js';
import { CATEGORIES } from '../data.js';
import { ProductCard } from './ProductCard.js';

interface ProductListViewProps {
  title: string;
  subtitle: string;
  products: Product[];
  initialSearchQuery?: string;
  currency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onNavigate: (view: ActiveView, categoryId?: CategoryId) => void;
}

export const ProductListView: React.FC<ProductListViewProps> = ({
  title,
  subtitle,
  products,
  initialSearchQuery = '',
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onSelectProduct,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [cashbackOnly, setCashbackOnly] = useState(false);
  const [flashOnly, setFlashOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Rating filter
      if (selectedRating > 0 && p.rating < selectedRating) {
        return false;
      }

      // Price filter
      if (p.price > maxPrice) {
        return false;
      }

      // Stock filter
      if (inStockOnly && !p.inStock) {
        return false;
      }

      // Cashback filter
      if (cashbackOnly && p.cashbackPercent <= 0) {
        return false;
      }

      // Flash sale filter
      if (flashOnly && !p.isFlashSale) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedRating, maxPrice, inStockOnly, cashbackOnly, flashOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRating(0);
    setMaxPrice(1500);
    setInStockOnly(false);
    setCashbackOnly(false);
    setFlashOnly(false);
    setSortBy('featured');
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-amber-600" />
          <span>Filters & Refinements</span>
        </h3>
        <button
          onClick={handleResetFilters}
          className="text-xs text-amber-600 hover:text-amber-700 font-semibold cursor-pointer"
        >
          Reset All
        </button>
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Department</label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
              selectedCategory === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>All Categories</span>
            <span className="font-mono text-[10px]">{products.length}</span>
          </button>
          {CATEGORIES.map(cat => {
            const count = products.filter(p => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                  selectedCategory === cat.id ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{cat.name}</span>
                <span className="font-mono text-[10px] opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold uppercase tracking-wider text-slate-500">Max Price</label>
          <span className="font-mono font-bold text-amber-600">
            {currency.symbol}{(maxPrice * currency.rate).toFixed(0)}
          </span>
        </div>
        <input
          type="range"
          min="10"
          max="1500"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>{currency.symbol}{(10 * currency.rate).toFixed(0)}</span>
          <span>{currency.symbol}{(1500 * currency.rate).toFixed(0)}+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Minimum Rating</label>
        <div className="space-y-1">
          {[4.8, 4.5, 4.0].map(r => (
            <button
              key={r}
              onClick={() => setSelectedRating(selectedRating === r ? 0 : r)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors ${
                selectedRating === r ? 'bg-amber-50 border border-amber-300 text-amber-900 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>{r}★ & above</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Status Checkboxes */}
      <div className="space-y-2 pt-2 border-t border-slate-200">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Special Filters</label>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded text-amber-500 focus:ring-amber-500"
            />
            <span>In Stock Only</span>
          </label>

          <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={cashbackOnly}
              onChange={(e) => setCashbackOnly(e.target.checked)}
              className="rounded text-amber-500 focus:ring-amber-500"
            />
            <span>Instant Wallet Cashback</span>
          </label>

          <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={flashOnly}
              onChange={(e) => setFlashOnly(e.target.checked)}
              className="rounded text-amber-500 focus:ring-amber-500"
            />
            <span>Flash Deal Discount</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer shadow-xs"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rating</option>
              <option value="discount">Highest Savings %</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(searchQuery || selectedCategory !== 'all' || selectedRating > 0 || inStockOnly || cashbackOnly || flashOnly || maxPrice < 1500) && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-medium">Active Filters:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-semibold">
              Query: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="cursor-pointer hover:text-slate-950"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold">
              {CATEGORIES.find(c => c.id === selectedCategory)?.name}
              <button onClick={() => setSelectedCategory('all')} className="cursor-pointer hover:text-slate-950"><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedRating > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-semibold">
              {selectedRating}★ & Up
              <button onClick={() => setSelectedRating(0)} className="cursor-pointer hover:text-slate-950"><X className="w-3 h-3" /></button>
            </span>
          )}
          {cashbackOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-semibold">
              Instant Cashback
              <button onClick={() => setCashbackOnly(false)} className="cursor-pointer hover:text-slate-950"><X className="w-3 h-3" /></button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs text-amber-600 hover:underline font-bold ml-1 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block bg-white p-5 rounded-3xl border border-slate-200 shadow-xs sticky top-24">
          <FilterSidebar />
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          <div className="mb-3 text-xs text-slate-500 font-medium">
            Found <strong className="text-slate-900">{filteredProducts.length}</strong> matching products
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
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
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No products matched your exact filter combination</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try widening your price range, removing rating constraints, or searching with broader keywords.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs cursor-pointer shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
          <div className="w-4/5 max-w-sm bg-white h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <h3 className="font-bold text-slate-900 text-base">Filter Catalog</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="text-slate-500 cursor-pointer">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterSidebar />
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
