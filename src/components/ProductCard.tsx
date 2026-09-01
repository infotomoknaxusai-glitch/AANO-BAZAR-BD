import React from 'react';
import { Heart, Star, ShoppingCart, Eye, Zap, Percent, Check } from 'lucide-react';
import { Product, Currency } from '../types.js';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onSelectProduct,
}) => {
  const convertedPrice = (product.price * currency.rate).toFixed(2);
  const convertedOriginal = (product.originalPrice * currency.rate).toFixed(2);

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isFlashSale && (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wide shadow-xs animate-pulse">
              <Zap className="w-3 h-3 fill-current" /> Flash Deal
            </span>
          )}
          {product.badge && !product.isFlashSale && (
            <span className="px-2 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black w-max">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Action Overlay buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-xs cursor-pointer ${
              isWishlisted
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            id={`quickview-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-amber-600 backdrop-blur-md transition-colors shadow-xs cursor-pointer opacity-0 group-hover:opacity-100"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Limited Stock Warning */}
        {product.stockCount <= 20 && (
          <div className="absolute bottom-2 left-2 right-2 bg-amber-950/80 backdrop-blur-xs text-amber-200 text-[10px] font-medium px-2 py-0.5 rounded text-center">
            Only {product.stockCount} left in stock!
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-amber-700 truncate">{product.brand}</span>
            <span className="text-slate-400 truncate">{product.categoryName}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-amber-600 transition-colors cursor-pointer mb-1.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-1.5 py-0.5 rounded text-[11px] font-bold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
            </div>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        <div>
          {/* Cashback Pill */}
          {product.cashbackPercent > 0 && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold mb-2 border border-emerald-200">
              <Percent className="w-2.5 h-2.5 text-emerald-600" />
              <span>Earn {product.cashbackPercent}% Instant Cashback</span>
            </div>
          )}

          {/* Pricing & Add to Cart */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black text-slate-950 font-mono">
                  {currency.symbol}{convertedPrice}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through font-mono">
                    {currency.symbol}{convertedOriginal}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-emerald-600 font-medium block">
                {product.deliveryEstimate}
              </span>
            </div>

            <button
              id={`add-cart-btn-${product.id}`}
              onClick={() => onAddToCart(product)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title="Add to Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
