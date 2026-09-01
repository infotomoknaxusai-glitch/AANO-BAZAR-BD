import React, { useState } from 'react';
import { 
  X, Trash2, ShoppingBag, ArrowRight, Percent, 
  Truck, ShieldCheck, Tag, Check, Sparkles 
} from 'lucide-react';
import { CartItem, Currency } from '../types.js';
import { DEALS_OFFERS } from '../data.js';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Coupon discount calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    const couponObj = DEALS_OFFERS.find(c => c.code.toLowerCase() === appliedCoupon.toLowerCase());
    if (couponObj) {
      if (couponObj.code === 'AANO20' || couponObj.code === 'APPVIP20') {
        couponDiscount = subtotal * 0.20;
      } else if (couponObj.code === 'FRESH15') {
        couponDiscount = subtotal * 0.15;
      } else if (couponObj.code === 'TECH50') {
        couponDiscount = Math.min(50, subtotal * 0.10);
      } else {
        couponDiscount = subtotal * 0.10;
      }
    }
  }

  const freeShippingThreshold = 35;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : 4.99);
  const total = Math.max(0, subtotal - couponDiscount + shippingFee);

  // Total cashback earned on this cart
  const totalCashback = items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity * (item.product.cashbackPercent / 100));
  }, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const success = onApplyCoupon(couponInput.trim());
    if (!success) {
      setCouponError('Invalid voucher code or conditions not met');
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-black text-slate-900 text-sm">Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)})</h2>
              <span className="text-[10px] text-slate-400 font-mono">100% Genuine Guaranteed</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {items.length > 0 && (
          <div className="px-5 py-2.5 bg-amber-50/80 border-b border-amber-200 text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>🎉 Unlocked FREE 2-Hour Express Delivery!</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-amber-900 font-semibold">
                  <span>Add {currency.symbol}{((freeShippingThreshold - subtotal) * currency.rate).toFixed(2)} more for Free Express Delivery</span>
                  <span className="font-mono">{Math.round((subtotal / freeShippingThreshold) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-amber-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length > 0 ? (
            items.map((item) => {
              const itemTotal = (item.product.price * item.quantity * currency.rate).toFixed(2);
              const unitPrice = (item.product.price * currency.rate).toFixed(2);

              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex gap-3 relative"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-slate-900 text-xs truncate pr-4">{item.product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected Variants */}
                      {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {Object.entries(item.selectedVariants).map(([k, v]) => (
                            <span key={k} className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.2 rounded text-slate-600">
                              {k}: {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded text-slate-700 hover:bg-slate-100 font-bold flex items-center justify-center cursor-pointer text-xs"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-bold text-xs font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded text-slate-700 hover:bg-slate-100 font-bold flex items-center justify-center cursor-pointer text-xs"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-slate-950 font-mono">
                          {currency.symbol}{itemTotal}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-slate-400 block font-mono">
                            ({currency.symbol}{unitPrice} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">Your cart is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our catalog of groceries, gadgets, and fashion to add items to your cart.
              </p>
            </div>
          )}
        </div>

        {/* Cart Summary & Checkout Footer */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-4">
            {/* Promo Code input */}
            <div>
              {appliedCoupon ? (
                <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-bold">Code "{appliedCoupon}" Applied</span>
                  </div>
                  <button onClick={onRemoveCoupon} className="text-rose-600 font-bold hover:underline cursor-pointer">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-1.5 text-xs">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Coupon / Promo Code"
                    className="p-2 flex-1 rounded-xl bg-white border border-slate-300 text-xs uppercase font-mono focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-rose-600 text-[10px] mt-1">{couponError}</p>}
            </div>

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span className="font-mono text-slate-900 font-semibold">{currency.symbol}{(subtotal * currency.rate).toFixed(2)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-amber-700 font-semibold">
                  <span>Voucher Savings</span>
                  <span className="font-mono">-{currency.symbol}{(couponDiscount * currency.rate).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span className="font-mono font-semibold">
                  {isFreeShipping ? (
                    <strong className="text-emerald-600 uppercase text-[10px]">FREE</strong>
                  ) : (
                    `${currency.symbol}${(shippingFee * currency.rate).toFixed(2)}`
                  )}
                </span>
              </div>

              {totalCashback > 0 && (
                <div className="flex justify-between text-emerald-700 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200/60 font-semibold">
                  <span className="flex items-center gap-1">
                    <Percent className="w-3 h-3 text-emerald-600" />
                    <span>Instant Wallet Cashback</span>
                  </span>
                  <span className="font-mono font-bold">+{currency.symbol}{(totalCashback * currency.rate).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="font-mono text-base">{currency.symbol}{(total * currency.rate).toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 transition-all hover:scale-101 active:scale-98"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
