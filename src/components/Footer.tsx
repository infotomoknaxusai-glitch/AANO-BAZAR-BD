import React, { useState } from 'react';
import { 
  ShoppingBag, ShieldCheck, Truck, Headphones, RotateCcw, 
  Store, TrendingUp, Mail, ArrowRight, Heart, Phone, MapPin, CheckCircle
} from 'lucide-react';
import { ActiveView, CategoryId } from '../types.js';
import { CATEGORIES } from '../data.js';

interface FooterProps {
  onNavigate: (view: ActiveView, categoryId?: CategoryId) => void;
  onOpenOrderTrack: () => void;
  onOpenAiAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenOrderTrack,
  onOpenAiAssistant
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">Express Free Shipping</h4>
              <p className="text-slate-400 text-xs">2-hr grocery & free 24-hr delivery on orders $35+</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">100% Genuine Guaranteed</h4>
              <p className="text-slate-400 text-xs">Direct brand warranties & authenticity certified</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">15-Day Easy Returns</h4>
              <p className="text-slate-400 text-xs">Instant doorstep pickup & prompt wallet refund</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">24/7 Customer Care & AI</h4>
              <p className="text-slate-400 text-xs">Live hotline support & smart AI shopping guide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white font-bold shadow-md shadow-amber-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white font-sans">
                AANO <span className="text-amber-500">BAZAR</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              AANO BAZAR is the premier multi-category digital marketplace bringing together farm-fresh groceries, cutting-edge electronics, luxury fashion, certified beauty essentials, and trusted dealer wholesale networks.
            </p>
            <div className="space-y-2 pt-1 text-slate-300 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Customer Care Hotline: +1 (800) 422-AANO / +977 1-492800</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>support@aanobazar.com | dealer@aanobazar.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Central Logistics Hub: Valley Plaza, Trade Tower 4, Kathmandu</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="font-bold text-slate-200 block mb-1 text-xs">Subscribe for Exclusive Flash Drops & Cashback</span>
              <form onSubmit={handleSubscribe} className="flex items-center max-w-sm gap-1.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-xs flex-1 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs cursor-pointer transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
              {subscribed && (
                <div className="mt-2 text-emerald-400 text-xs flex items-center gap-1 animate-in fade-in">
                  <CheckCircle className="w-3.5 h-3.5" /> Welcome! Your 20% welcome discount token is ready.
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h5 className="font-bold text-slate-100 uppercase tracking-wider text-xs mb-3">Categories</h5>
            <ul className="space-y-2">
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => onNavigate('category', cat.id)}
                    className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => onNavigate('all-categories')}
                  className="text-amber-400 hover:underline font-semibold cursor-pointer"
                >
                  Browse All Categories Directory →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Deals & Merchants */}
          <div>
            <h5 className="font-bold text-slate-100 uppercase tracking-wider text-xs mb-3">Deals & Partners</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('deals')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Deals & Coupons
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('flash-sale')} className="hover:text-rose-400 transition-colors text-left font-semibold text-rose-300 cursor-pointer">
                  Flash Sale (Live Clocks)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cashback')} className="hover:text-emerald-400 transition-colors text-left text-emerald-300 font-semibold cursor-pointer">
                  Cashback Rewards (Up to 20%)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('new-arrivals')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('best-sellers')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Best Sellers
                </button>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <button onClick={() => onNavigate('sell-on-aano')} className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 font-bold text-slate-200 cursor-pointer">
                  <Store className="w-3.5 h-3.5 text-amber-400" /> Sell on AANO BAZAR
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('become-dealer')} className="hover:text-amber-400 transition-colors text-left flex items-center gap-1.5 font-bold text-slate-200 cursor-pointer">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Become a Wholesale Dealer
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Policy */}
          <div>
            <h5 className="font-bold text-slate-100 uppercase tracking-wider text-xs mb-3">Customer Support</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about-us')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact-us')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Contact Us & Locations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={onOpenOrderTrack} className="hover:text-amber-400 transition-colors text-left text-amber-400 font-semibold cursor-pointer">
                  Track Live Order Status
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('return-policy')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('delivery-policy')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Delivery Policy & Speed Rates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-amber-400 transition-colors text-left cursor-pointer">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & payment security */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} AANO BAZAR Superstore Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">VISA</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">MasterCard</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">UPI / QR</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">eSewa / Khalti</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">Cash on Delivery</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-[10px]">AANO Wallet</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
