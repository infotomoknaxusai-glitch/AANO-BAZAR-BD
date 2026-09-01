import React from 'react';
import { 
  ShoppingBag, ShieldCheck, Truck, Users, Award, 
  Target, Sparkles, Globe, HeartHandshake, CheckCircle2 
} from 'lucide-react';
import { ActiveView } from '../types.js';

interface AboutUsViewProps {
  onNavigate: (view: ActiveView) => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 md:p-14 shadow-2xl border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>The AANO BAZAR Story</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Building the Next-Generation Multi-Category Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Founded with the vision to unify farm-direct daily essentials, authentic electronics, artisan lifestyle fashion, and verified wholesale dealer networks under one reliable, high-speed digital umbrella.
          </p>
        </div>
      </div>

      {/* Core Mission & Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">100% Genuine Certified</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We partner exclusively with certified brand distributors and authorized regional farmers. Every package undergoes barcode serial validation before reaching your door.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Hyperlocal Speed & Cold Chain</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our micro-fulfillment network delivers farm groceries and daily kitchen necessities within 2 hours, alongside 24-hour standard dispatch for electronics and apparel.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Rewarding Community</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Through the AANO Wallet Rewards program, our shoppers enjoy transparent, unexpiring instant cashback up to 20% on every order.
          </p>
        </div>
      </div>

      {/* Marketplace Stats by the Numbers */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800">
        <h2 className="text-center text-xl font-black mb-8 tracking-tight">AANO BAZAR at a Glance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-3xl md:text-4xl font-black text-amber-400 font-mono block">500k+</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Customers</span>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-black text-amber-400 font-mono block">12,000+</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Verified SKUs</span>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-black text-amber-400 font-mono block">99.4%</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">On-Time Delivery</span>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-black text-amber-400 font-mono block">850+</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Wholesale Dealers</span>
          </div>
        </div>
      </div>

      {/* Leadership & Values */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
        <div className="max-w-xl space-y-1">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Our Quality & Consumer Promise</h2>
          <p className="text-xs text-slate-500">Every team member at AANO BAZAR is committed to four non-negotiable promises:</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">Authenticity Over Everything</h4>
              <p className="text-slate-600">Zero tolerance for counterfeit items. 200% money-back guarantee if an item fails authenticity checks.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">Transparent Fair Pricing</h4>
              <p className="text-slate-600">Direct factory-to-door relationships eliminate excessive middleman markups across all 7 categories.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">Hassle-Free Returns</h4>
              <p className="text-slate-600">15-day return window with doorstep rider pick-up and instant wallet credit without interrogation.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">Empowering Local Merchants</h4>
              <p className="text-slate-600">Dedicated portals, automated accounting, and logistics infrastructure for regional suppliers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
