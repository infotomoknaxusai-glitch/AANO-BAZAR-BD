import React, { useState } from 'react';
import { 
  X, Star, Heart, ShoppingCart, ShieldCheck, Truck, RotateCcw, 
  Percent, Zap, Share2, Check, ArrowRight, Sparkles 
} from 'lucide-react';
import { Product, Currency } from '../types.js';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product, qty: number, variants?: Record<string, string>) => void;
  onBuyNow: (p: Product, qty: number, variants?: Record<string, string>) => void;
  onOpenAiAssistant: () => void;
  allProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onOpenAiAssistant,
  allProducts,
  onSelectProduct,
}) => {
  if (!isOpen || !product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants?.forEach(v => {
      if (v.options.length > 0) {
        initial[v.name] = v.options[0];
      }
    });
    return initial;
  });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  const convertedPrice = (product.price * currency.rate).toFixed(2);
  const convertedOriginal = (product.originalPrice * currency.rate).toFixed(2);
  const savings = ((product.originalPrice - product.price) * currency.rate).toFixed(2);
  const cashbackValue = ((product.price * (product.cashbackPercent / 100)) * currency.rate).toFixed(2);

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleVariantChange = (name: string, option: string) => {
    setSelectedVariants(prev => ({ ...prev, [name]: option }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{product.categoryName}</span>
            <span>/</span>
            <span className="text-slate-500">{product.subcategory}</span>
            <span>/</span>
            <span className="font-mono text-slate-400">SKU: {product.sku}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer flex items-center gap-1 text-xs"
              title="Share product"
            >
              <Share2 className="w-4 h-4" />
              {copied && <span className="text-emerald-600 font-bold text-[10px]">Link Copied!</span>}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-950 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gallery Left Column */}
            <div className="space-y-3">
              <div className="relative aspect-square w-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {product.isFlashSale && (
                  <div className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg uppercase tracking-wide flex items-center gap-1 shadow-md animate-pulse">
                    <Zap className="w-3.5 h-3.5 fill-current" /> Live Flash Deal
                  </div>
                )}
                {product.badge && !product.isFlashSale && (
                  <div className="absolute top-3 left-3 bg-slate-900 text-white font-bold text-xs px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        selectedImageIndex === idx ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* AI Concierge quick banner */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 fill-amber-600" />
                  <span className="text-amber-900 font-medium">Unsure about sizing or specs?</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAiAssistant();
                  }}
                  className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg cursor-pointer transition-colors shadow-xs"
                >
                  Ask AanoBot AI
                </button>
              </div>
            </div>

            {/* Product Meta & Actions Right Column */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700">{product.brand}</span>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-900 font-bold text-xs border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewCount} customer reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  {product.name}
                </h1>
                <p className="text-xs text-slate-500 mt-1">{product.shortDesc}</p>
              </div>

              {/* Price & Savings Strip */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-950 font-mono">
                    {currency.symbol}{convertedPrice}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-base text-slate-400 line-through font-mono">
                        {currency.symbol}{convertedOriginal}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-extrabold text-xs">
                        Save {product.discountPercent}% ({currency.symbol}{savings})
                      </span>
                    </>
                  )}
                </div>

                {product.cashbackPercent > 0 && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    <Percent className="w-4 h-4 text-emerald-600" />
                    <span>AANO Wallet Cashback: Earn {product.cashbackPercent}% ({currency.symbol}{cashbackValue}) back on this purchase</span>
                  </div>
                )}
              </div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-3">
                  {product.variants.map((v) => (
                    <div key={v.name} className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {v.name}: <span className="text-amber-700 font-semibold">{selectedVariants[v.name] || v.options[0]}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {v.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleVariantChange(v.name, opt)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              (selectedVariants[v.name] || v.options[0]) === opt
                                ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity and CTA Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-200 font-bold flex items-center justify-center cursor-pointer shadow-xs"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold font-mono text-sm text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-200 font-bold flex items-center justify-center cursor-pointer shadow-xs"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    <span className="block text-[11px] text-slate-400">({product.stockCount} units available)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity, selectedVariants);
                      onClose();
                    }}
                    className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-98"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      onBuyNow(product, quantity, selectedVariants);
                      onClose();
                    }}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/20 transition-all active:scale-98"
                  >
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>Instant Checkout</span>
                  </button>
                </div>

                {/* Wishlist button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Your Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Guarantees & Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 text-center">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-slate-800 block">100% Genuine</span>
                  <span className="text-[9px] text-slate-500 block">{product.warranty}</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <Truck className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-slate-800 block">Fast Delivery</span>
                  <span className="text-[9px] text-slate-500 block">{product.deliveryEstimate}</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <RotateCcw className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-slate-800 block">{product.returnDays}-Day Returns</span>
                  <span className="text-[9px] text-slate-500 block">Doorstep pickup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section: Details, Specifications, Reviews */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center gap-4 border-b border-slate-200 mb-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                  activeTab === 'details'
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Overview & Features
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                  activeTab === 'specs'
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Customer Reviews ({product.reviewCount})
              </button>
            </div>

            {activeTab === 'details' && (
              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <p className="text-sm font-medium text-slate-800">{product.description}</p>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Key Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
                <table className="w-full text-left">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'}>
                        <td className="py-2.5 px-4 font-bold text-slate-700 w-1/3 border-b border-slate-100">{key}</td>
                        <td className="py-2.5 px-4 text-slate-600 border-b border-slate-100 font-mono">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-black text-slate-900 font-mono">{product.rating}</div>
                    <div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">{product.reviewCount} Verified Buyer Ratings</span>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
                    100% Authentic Customer Feedback from AANO BAZAR shoppers
                  </div>
                </div>

                {/* Sample Verified Reviews */}
                <div className="space-y-3">
                  {[
                    { name: 'Siddhartha S.', rating: 5, date: '3 days ago', comment: 'Exceeded all my expectations. Exceptional quality and delivered in 2 hours flat. Will definitely order again from AANO BAZAR!' },
                    { name: 'Elena R.', rating: 5, date: '1 week ago', comment: 'Genuine product with warranty card and seal intact. The cashback bonus made this the best price on the market.' },
                    { name: 'Rajesh K.', rating: 4.8, date: '2 weeks ago', comment: 'Top-tier materials and packaging. Very happy with the purchase.' },
                  ].map((rev, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{rev.name}</span>
                          <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] rounded font-semibold">Verified Buyer</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, si) => (
                          <Star key={si} className="w-3 h-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <p className="text-slate-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related / You May Also Like Recommendations */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">
                Customers Also Viewed in {product.categoryName}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setSelectedImageIndex(0);
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 flex flex-col justify-between"
                  >
                    <img src={rel.images[0]} alt={rel.name} className="w-full aspect-square object-cover rounded-lg mb-2" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{rel.name}</p>
                      <span className="text-xs font-black text-amber-600 font-mono">{currency.symbol}{(rel.price * currency.rate).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
