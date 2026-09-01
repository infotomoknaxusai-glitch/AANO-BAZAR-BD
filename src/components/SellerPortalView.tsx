import React, { useState } from 'react';
import { 
  Store, CheckCircle2, DollarSign, TrendingUp, ShieldCheck, 
  Truck, ArrowRight, Sparkles, Building, Mail, Phone, User
} from 'lucide-react';
import { Currency } from '../types.js';

interface SellerPortalViewProps {
  currency: Currency;
}

export const SellerPortalView: React.FC<SellerPortalViewProps> = ({ currency }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    category: 'Electronics',
    monthlyRevenue: '$5k - $25k',
    warehouseCity: '',
    taxId: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [estSales, setEstSales] = useState(10000);

  const estimatedPayout = (estSales * 0.94).toFixed(2); // 6% average fee after promo

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* Seller Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-8 md:p-14 shadow-2xl border border-slate-800">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs uppercase tracking-wider border border-amber-500/30">
            <Store className="w-3.5 h-3.5" />
            <span>AANO BAZAR Marketplace Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Sell to 500,000+ Verified Buyers on AANO BAZAR
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Expand your brand with zero onboarding fees, 90 days of 0% listing commission, integrated doorstep pickup logistics, and automatic daily payout settlements.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-amber-400">
            <span>✓ 0% Commission for 90 Days</span>
            <span>✓ Automated Shipping & Label Printing</span>
            <span>✓ 24-Hr Seller Support Team</span>
          </div>
        </div>
      </div>

      {/* Seller Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Nationwide Omnichannel Reach</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Instantly list across our high-traffic mobile and web applications with smart search indexing, AI product descriptions, and targeted promotional banner exposure.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">AANO Express Logistics</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our certified courier partners collect packaged orders right from your warehouse or storefront with complete tracking barcodes and zero shipping insurance hassle.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Secure Direct Bank Settlements</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Funds from fulfilled orders are automatically settled to your verified business bank account on a predictable 24-hour cycle with transparent accounting statements.
          </p>
        </div>
      </div>

      {/* Interactive Fee & Payout Calculator */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="max-w-xl">
          <h2 className="text-xl font-black tracking-tight">Seller Revenue & Profit Estimator</h2>
          <p className="text-xs text-slate-400">Calculate how much you take home after AANO BAZAR fulfillment & payment gateway processing</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">Projected Monthly Sales Volume:</span>
            <span className="text-xl font-black text-amber-400 font-mono">
              ${estSales.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={estSales}
            onChange={(e) => setEstSales(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Platform Fee (Promotional 0%-6%)</span>
            <span className="text-lg font-bold text-slate-200 font-mono">
              ${(estSales * 0.04).toFixed(2)}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block font-medium">Payment Gateway Fee (2%)</span>
            <span className="text-lg font-bold text-slate-200 font-mono">
              ${(estSales * 0.02).toFixed(2)}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <span className="text-[11px] text-amber-400 block font-bold">Your Net Estimated Bank Payout:</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              ${estimatedPayout}
            </span>
          </div>
        </div>
      </div>

      {/* Seller Application Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Register as an AANO BAZAR Seller</h2>
          <p className="text-xs text-slate-500">
            Fill out your business details. Our onboarding manager will verify your store catalog and activate your portal within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-950">Application Received Successfully!</h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Thank you for applying to sell on AANO BAZAR, <strong>{formData.businessName}</strong>. Our merchant onboarding team has emailed your temporary dashboard credentials to <strong>{formData.email}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Business / Store Name *</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="e.g. Himalayan Organics Traders"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Contact Person Name *</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="e.g. Maya Shrestha"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Business Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seller@yourbusiness.com"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 019-2834"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Primary Product Department *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 bg-white"
                >
                  <option value="Grocery">Grocery & Organic Foods</option>
                  <option value="Electronics">Electronics & Audio</option>
                  <option value="Fashion">Fashion & Apparel</option>
                  <option value="Beauty">Beauty & Personal Care</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Mobile & Accessories">Mobile & Accessories</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Warehouse / City Location *</label>
                <input
                  type="text"
                  required
                  value={formData.warehouseCity}
                  onChange={(e) => setFormData({ ...formData, warehouseCity: e.target.value })}
                  placeholder="e.g. Kathmandu, Pokhara, San Jose"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-amber-500/20"
            >
              Submit Seller Application & Start Selling
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
