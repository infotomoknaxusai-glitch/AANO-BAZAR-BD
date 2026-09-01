import React, { useState } from 'react';
import { 
  X, Check, ShieldCheck, Truck, CreditCard, 
  Wallet, DollarSign, ArrowRight, CheckCircle2, 
  Sparkles, Lock, MapPin, Phone, User, Package
} from 'lucide-react';
import { CartItem, Currency } from '../types.js';
import { DEALS_OFFERS } from '../data.js';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  appliedCoupon: string | null;
  onOrderCompleted: (orderId: string) => void;
  onOpenOrderTrack: (orderId: string) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  appliedCoupon,
  onOrderCompleted,
  onOpenOrderTrack,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  // Shipping & Contact form
  const [formData, setFormData] = useState({
    fullName: 'Pooja Sharma',
    email: 'pooja.sharma@example.com',
    phone: '+977 9841-294821',
    address: 'Baluwatar Road, Ward 4, House 21',
    city: 'Kathmandu',
    deliveryNote: 'Leave with building security or call on arrival',
    deliverySpeed: 'express', // express | standard | eco
    paymentMethod: 'card', // card | wallet | upi | cod
    useWalletCashback: true,
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Discount
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

  const isFreeShipping = subtotal >= 35;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : (formData.deliverySpeed === 'express' ? 4.99 : 2.99));
  const walletBalanceDeduction = formData.useWalletCashback ? Math.min(12.50, subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal - couponDiscount + shippingFee - walletBalanceDeduction);

  const totalCashback = items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity * (item.product.cashbackPercent / 100));
  }, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `AB-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedOrderId(newOrderId);
    setStep('success');
    onOrderCompleted(newOrderId);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              {step === 'checkout' ? '256-Bit SSL Encrypted Checkout' : 'Order Confirmed'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="overflow-y-auto p-6 flex-1">
          {step === 'checkout' ? (
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Delivery & Payment Details */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Contact & Address */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>1. Delivery Destination & Contact</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="font-semibold text-slate-700">Street / Area Address *</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">City / Zone *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Speed */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>2. Delivery Speed</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      formData.deliverySpeed === 'express'
                        ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">⚡ 2-Hour Express</span>
                        <input
                          type="radio"
                          name="deliverySpeed"
                          value="express"
                          checked={formData.deliverySpeed === 'express'}
                          onChange={() => setFormData({ ...formData, deliverySpeed: 'express' })}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Priority dispatch from closest local hub</p>
                    </label>

                    <label className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      formData.deliverySpeed === 'standard'
                        ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">🚚 Standard (24 Hours)</span>
                        <input
                          type="radio"
                          name="deliverySpeed"
                          value="standard"
                          checked={formData.deliverySpeed === 'standard'}
                          onChange={() => setFormData({ ...formData, deliverySpeed: 'standard' })}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Standard consolidated logistics</p>
                    </label>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    <span>3. Payment Gateway</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'card', label: 'Cards (Visa/MC)', icon: CreditCard },
                      { id: 'wallet', label: 'AANO Wallet', icon: Wallet },
                      { id: 'upi', label: 'UPI / eSewa / QR', icon: Sparkles },
                      { id: 'cod', label: 'Cash on Delivery', icon: DollarSign }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                          formData.paymentMethod === method.id
                            ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <method.icon className="w-4 h-4" />
                        <span className="font-bold text-[11px]">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Wallet Balance Offset Checkbox */}
                  <label className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.useWalletCashback}
                      onChange={(e) => setFormData({ ...formData, useWalletCashback: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>
                      Apply <strong>{currency.symbol}{(walletBalanceDeduction * currency.rate).toFixed(2)}</strong> from your available AANO Wallet balance
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 transition-all hover:scale-101"
                >
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Place Order ({currency.symbol}{(total * currency.rate).toFixed(2)})</span>
                </button>
              </div>

              {/* Right Column: Mini Cart Summary */}
              <div className="lg:col-span-5 bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} Items)
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-xs gap-3">
                      <div className="flex items-center gap-2.5 truncate">
                        <img src={item.product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover border shrink-0" />
                        <div className="truncate">
                          <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                          <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-slate-900 shrink-0">
                        {currency.symbol}{(item.product.price * item.quantity * currency.rate).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation Details */}
                <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono">{currency.symbol}{(subtotal * currency.rate).toFixed(2)}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-amber-700 font-semibold">
                      <span>Voucher Discount</span>
                      <span className="font-mono">-{currency.symbol}{(couponDiscount * currency.rate).toFixed(2)}</span>
                    </div>
                  )}

                  {walletBalanceDeduction > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Wallet Offset</span>
                      <span className="font-mono">-{currency.symbol}{(walletBalanceDeduction * currency.rate).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping Speed Fee</span>
                    <span className="font-mono">
                      {shippingFee === 0 ? 'FREE' : `${currency.symbol}${(shippingFee * currency.rate).toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-200">
                    <span>Grand Total</span>
                    <span className="font-mono text-lg">{currency.symbol}{(total * currency.rate).toFixed(2)}</span>
                  </div>

                  {totalCashback > 0 && (
                    <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] font-bold text-center">
                      +{currency.symbol}{(totalCashback * currency.rate).toFixed(2)} Instant Cashback will be added to your AANO Wallet upon dispatch!
                    </div>
                  )}
                </div>
              </div>
            </form>
          ) : (
            /* Order Success Screen */
            <div className="py-8 px-4 text-center max-w-lg mx-auto space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Order Confirmed</span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Thank You for Shopping on AANO BAZAR!
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your order <strong>#{generatedOrderId}</strong> has been received by our regional logistics hub. We've sent the invoice and SMS dispatch tracking link to <strong>{formData.phone}</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order Reference:</span>
                  <span className="font-mono font-bold text-slate-900">#{generatedOrderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="font-medium text-slate-900">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Arrival:</span>
                  <span className="font-bold text-emerald-600">Today within 2 Hours</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenOrderTrack(generatedOrderId);
                  }}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Track Live Delivery Status</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
