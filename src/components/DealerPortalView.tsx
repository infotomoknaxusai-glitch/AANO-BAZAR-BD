import React, { useState } from 'react';
import { 
  TrendingUp, Building2, PackageCheck, FileSpreadsheet, 
  CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Download 
} from 'lucide-react';
import { Currency } from '../types.js';

interface DealerPortalViewProps {
  currency: Currency;
}

export const DealerPortalView: React.FC<DealerPortalViewProps> = ({ currency }) => {
  const [dealerForm, setDealerForm] = useState({
    companyName: '',
    regNumber: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: 'Retail Store Chain',
    orderVolume: '$25,000 - $100,000 / Quarter',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-8 md:p-14 shadow-2xl border border-emerald-800/40">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>AANO BAZAR Wholesale & B2B Dealer Program</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Wholesale Pricing & Direct Factory Distribution
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Partner directly with AANO BAZAR's supply network. Access tiered wholesale discounts up to 48%, Net 30/45 payment credit lines, scheduled container/pallet shipments, and specialized dealer pricing APIs.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-emerald-400">
            <span>✓ Up to 48% Wholesale Margins</span>
            <span>✓ Net-30 / Net-45 Credit Terms</span>
            <span>✓ Pallet & Container Freight</span>
          </div>
        </div>
      </div>

      {/* Dealer Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <PackageCheck className="w-8 h-8 text-emerald-600 mb-2" />
          <h3 className="font-bold text-slate-900 text-sm">Bulk Pallet Discounts</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Direct pricing tiers on full carton and pallet orders across electronics, pantry staples, and kitchen equipment.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <CreditCard className="w-8 h-8 text-amber-600 mb-2" />
          <h3 className="font-bold text-slate-900 text-sm">Flexible Credit Lines</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Eligible registered dealers receive up to $100,000 in revolving revolving Net-30 or Net-45 purchase financing.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <Building2 className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-bold text-slate-900 text-sm">Dedicated B2B Rep</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            A single dedicated key account manager handles your custom quotations, bill of lading, and tax exemptions.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <ShieldCheck className="w-8 h-8 text-purple-600 mb-2" />
          <h3 className="font-bold text-slate-900 text-sm">OEM Certified Stock</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            100% certified authentic inventory with factory seal verification, transferable warranties, and recall coverage.
          </p>
        </div>
      </div>

      {/* Dealer Application Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Apply for Wholesale Dealer Status</h2>
          <p className="text-xs text-slate-500">
            Submit your corporate and tax credentials. Our B2B commercial division reviews and activates wholesale accounts within 1 business day.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-950">Wholesale Application Submitted!</h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Thank you, <strong>{dealerForm.companyName}</strong>. A dedicated wholesale relationship manager will reach out via <strong>{dealerForm.email}</strong> with your customized catalog and credit line application.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Company / Enterprise Legal Name *</label>
                <input
                  type="text"
                  required
                  value={dealerForm.companyName}
                  onChange={(e) => setDealerForm({ ...dealerForm, companyName: e.target.value })}
                  placeholder="e.g. Apex Retail Distributions Ltd."
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Tax ID / PAN / VAT Registration *</label>
                <input
                  type="text"
                  required
                  value={dealerForm.regNumber}
                  onChange={(e) => setDealerForm({ ...dealerForm, regNumber: e.target.value })}
                  placeholder="e.g. VAT-981240182"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Authorised Contact Name *</label>
                <input
                  type="text"
                  required
                  value={dealerForm.contactName}
                  onChange={(e) => setDealerForm({ ...dealerForm, contactName: e.target.value })}
                  placeholder="e.g. Sandeep Adhikari"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Corporate Email *</label>
                <input
                  type="email"
                  required
                  value={dealerForm.email}
                  onChange={(e) => setDealerForm({ ...dealerForm, email: e.target.value })}
                  placeholder="procurement@company.com"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Business Model *</label>
                <select
                  value={dealerForm.businessType}
                  onChange={(e) => setDealerForm({ ...dealerForm, businessType: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 bg-white"
                >
                  <option value="Retail Store Chain">Retail Store Chain</option>
                  <option value="Regional Distributor">Regional Distributor</option>
                  <option value="Hospitality & Institutional Buyer">Hospitality & Institutional Buyer</option>
                  <option value="Corporate Office Procurement">Corporate Office Procurement</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Expected Quarterly Volume *</label>
                <select
                  value={dealerForm.orderVolume}
                  onChange={(e) => setDealerForm({ ...dealerForm, orderVolume: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 bg-white"
                >
                  <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                  <option value="$25,000 - $100,000">$25,000 - $100,000</option>
                  <option value="$100,000 - $500,000">$100,000 - $500,000</option>
                  <option value="$500,000+">$500,000+ (Tier 1 Wholesale)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Specific Product Lines or Pallet Requirements</label>
              <textarea
                rows={3}
                value={dealerForm.notes}
                onChange={(e) => setDealerForm({ ...dealerForm, notes: e.target.value })}
                placeholder="List SKU categories or monthly pallet volume needed..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Submit Wholesale Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
