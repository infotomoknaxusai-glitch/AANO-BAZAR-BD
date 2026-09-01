import React, { useState } from 'react';
import { 
  ChevronRight, Filter, SlidersHorizontal, ArrowUpDown, 
  Sparkles, Check, Tag, Star, ShoppingBag, Laptop, Shirt, HeartPulse, Home, Smartphone
} from 'lucide-react';
import { CATEGORIES } from '../data.js';
import { Product, CategoryId, ActiveView, Currency, Category } from '../types.js';
import { ProductCard } from './ProductCard.js';

interface CategoriesViewProps {
  selectedCategory: CategoryId | null;
  products: Product[];
  currency: Currency;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onNavigate: (view: ActiveView, categoryId?: CategoryId) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  selectedCategory,
  products,
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onSelectProduct,
  onNavigate,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [cashbackOnly, setCashbackOnly] = useState(false);

  // If a specific category is active:
  const currentCategory = CATEGORIES.find(c => c.id === selectedCategory);

  // Filter products by selected category
  let categoryProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  if (selectedSubcategory !== 'all') {
    categoryProducts = categoryProducts.filter(p => p.subcategory === selectedSubcategory);
  }
  if (selectedBrand !== 'all') {
    categoryProducts = categoryProducts.filter(p => p.brand === selectedBrand);
  }
  if (inStockOnly) {
    categoryProducts = categoryProducts.filter(p => p.inStock);
  }
  if (cashbackOnly) {
    categoryProducts = categoryProducts.filter(p => p.cashbackPercent > 0);
  }

  // Sort
  categoryProducts.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
    return 0; // featured default
  });

  // If viewing "All Categories" directory
  if (!selectedCategory || !currentCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            AANO BAZAR Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            All Product Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Browse our comprehensive department catalog with authentic warranties, verified seller reviews, and express fulfillment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-amber-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.bannerImage}
                    alt={cat.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-4 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">{cat.itemCount}+ Available Products</span>
                    <h3 className="text-lg font-black">{cat.name}</h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Subcategories:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.slice(0, 4).map((sub) => (
                        <span key={sub} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                          {sub}
                        </span>
                      ))}
                      {cat.subcategories.length > 4 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                          +{cat.subcategories.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onNavigate('category', cat.id)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Explore {cat.shortName}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Specific Category Page with Filters & Products
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 md:p-12 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl z-10">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
            <button onClick={() => onNavigate('home')} className="hover:underline cursor-pointer">Home</button>
            <span>/</span>
            <button onClick={() => onNavigate('all-categories')} className="hover:underline cursor-pointer">Categories</button>
            <span>/</span>
            <span className="text-white">{currentCategory.name}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{currentCategory.name}</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{currentCategory.description}</p>

          <div className="flex items-center gap-4 text-xs font-medium text-amber-400 pt-1">
            <span>✓ {currentCategory.itemCount}+ Items Listed</span>
            <span>✓ 100% Genuine Certified</span>
            <span>✓ Same Day Dispatch</span>
          </div>
        </div>

        <div className="w-full md:w-72 aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/10 shrink-0">
          <img src={currentCategory.bannerImage} alt={currentCategory.name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Subcategory Pills Strip */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Filter by Subcategory:</span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedSubcategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedSubcategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Subcategories ({products.filter(p => p.category === selectedCategory).length})
          </button>
          {currentCategory.subcategories.map((sub) => {
            const count = products.filter(p => p.category === selectedCategory && p.subcategory === sub).length;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSubcategory === sub
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sub} {count > 0 && <span className="opacity-70 font-mono">({count})</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
              inStockOnly ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            ✓ In Stock Only
          </button>

          <button
            onClick={() => setCashbackOnly(!cashbackOnly)}
            className={`px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
              cashbackOnly ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            % Instant Cashback Only
          </button>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">All Brands ({currentCategory.popularBrands.length})</option>
            {currentCategory.popularBrands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Sort selector & Count */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{categoryProducts.length}</strong> products
          </span>

          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="featured">Featured / Best Match</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="discount">Highest Discount %</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryProducts.map((product) => (
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
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No products match your current filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your subcategory, brand, or cashback filters to view all products in {currentCategory.name}.
          </p>
          <button
            onClick={() => {
              setSelectedSubcategory('all');
              setSelectedBrand('all');
              setInStockOnly(false);
              setCashbackOnly(false);
            }}
            className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs cursor-pointer hover:bg-amber-600"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
