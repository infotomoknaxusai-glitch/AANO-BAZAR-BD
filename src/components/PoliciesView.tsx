import React, { useState } from 'react';
import { 
  FileText, ShieldCheck, RotateCcw, Truck, CheckCircle2, 
  AlertCircle, MapPin, Search, ArrowRight, Clock, HelpCircle 
} from 'lucide-react';
import { ActiveView } from '../types.js';

interface PoliciesViewProps {
  view: 'terms' | 'privacy' | 'return-policy' | 'delivery-policy';
  onNavigate: (view: ActiveView) => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({ view, onNavigate }) => {
  // RMA Return request state
  const [rmaOrder, setRmaOrder] = useState('');
  const [rmaReason, setRmaReason] = useState('Defective / Damaged during transit');
  const [rmaResult, setRmaResult] = useState<string | null>(null);

  // Delivery speed checker state
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  const handleRmaCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (rmaOrder.trim()) {
      setRmaResult(`Order #${rmaOrder} is ELIGIBLE for 15-day free doorstep return pickup. RMA Return Slip #RMA-${Math.floor(10000 + Math.random() * 90000)} generated.`);
    }
  };

  const handleDeliveryCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim()) {
      setDeliveryResult(`Location (${pincode}): Qualified for Express 2-Hour Grocery Delivery & Next-Day Standard Fulfillment! Free delivery unlocked on orders $35+`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Navigation tabs between policies */}
      <div className="flex items-center justify-center gap-2 border-b border-slate-200 pb-4 flex-wrap">
        <button
          onClick={() => onNavigate('return-policy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            view === 'return-policy' ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Return & Refund Policy</span>
        </button>

        <button
          onClick={() => onNavigate('delivery-policy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            view === 'delivery-policy' ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Delivery Policy & Rates</span>
        </button>

        <button
          onClick={() => onNavigate('terms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            view === 'terms' ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Terms & Conditions</span>
        </button>

        <button
          onClick={() => onNavigate('privacy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
            view === 'privacy' ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy & Security</span>
        </button>
      </div>

      {/* RETURN & REFUND POLICY VIEW */}
      {view === 'return-policy' && (
        <div className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">AANO Customer Protection</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              15-Day Hassle-Free Return & Instant Refund Policy
            </h1>
            <p className="text-xs text-slate-500">Last updated: January 2025 • Guaranteed doorstep pickup across all regions</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-2xl font-black text-slate-900 font-mono block">15 Days</span>
              <span className="text-xs text-slate-500 font-semibold">Standard Return Window</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-2xl font-black text-emerald-700 font-mono block">0 Fee</span>
              <span className="text-xs text-emerald-700 font-semibold">Free Doorstep Pickup</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-2xl font-black text-amber-700 font-mono block">&lt; 24 Hrs</span>
              <span className="text-xs text-amber-700 font-semibold">Direct Wallet / Card Refund</span>
            </div>
          </div>

          {/* Interactive RMA Return Request Box */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
            <div>
              <h3 className="font-bold text-base text-amber-400">Initiate Instant RMA Return Pickup</h3>
              <p className="text-xs text-slate-300">Enter your order ID to verify return eligibility and schedule our courier</p>
            </div>

            <form onSubmit={handleRmaCheck} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={rmaOrder}
                  onChange={(e) => setRmaOrder(e.target.value)}
                  placeholder="Order ID (e.g. AB-92812)"
                  className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                />
                <select
                  value={rmaReason}
                  onChange={(e) => setRmaReason(e.target.value)}
                  className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Defective / Damaged during transit">Defective / Damaged during transit</option>
                  <option value="Incorrect size or variant received">Incorrect size or variant received</option>
                  <option value="Product not as described on website">Product not as described on website</option>
                  <option value="Changed mind / No longer needed">Changed mind / No longer needed</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs cursor-pointer uppercase tracking-wider"
              >
                Check RMA Eligibility
              </button>

              {rmaResult && (
                <div className="mt-2 p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{rmaResult}</span>
                </div>
              )}
            </form>
          </div>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <h3 className="font-bold text-slate-900 text-sm">1. Return Eligibility Requirements</h3>
            <p>To qualify for a full refund or exchange, items must be in original condition with product tags, authenticity cards, serial seals, and packaging accessories intact. Perishable fresh grocery items must be reported within 24 hours of delivery.</p>

            <h3 className="font-bold text-slate-900 text-sm">2. Refund Methods & Timelines</h3>
            <p>Refunds to your <strong>AANO Digital Wallet</strong> are issued immediately upon rider pickup scan. Refunds to original credit/debit cards or bank accounts will reflect within 2 to 5 business days according to your issuing financial institution.</p>
          </div>
        </div>
      )}

      {/* DELIVERY POLICY VIEW */}
      {view === 'delivery-policy' && (
        <div className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">AANO Logistics Network</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Delivery Speeds, Shipping Rates & Coverage
            </h1>
            <p className="text-xs text-slate-500">Transparent fulfillment standards across metropolitan and regional zones</p>
          </div>

          {/* Interactive Pincode Checker */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
            <div>
              <h3 className="font-bold text-base text-amber-400">Check Instant Delivery Estimate for Your Pincode</h3>
              <p className="text-xs text-slate-300">Verify 2-hour grocery dispatch and same-day delivery feasibility</p>
            </div>

            <form onSubmit={handleDeliveryCheck} className="flex gap-2 text-xs">
              <input
                type="text"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode / Postal Code / City"
                className="p-2.5 flex-1 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs cursor-pointer uppercase tracking-wider shrink-0"
              >
                Estimate Speed
              </button>
            </form>

            {deliveryResult && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{deliveryResult}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block text-sm">⚡ 2-Hour Express Grocery</span>
              <p className="text-slate-600">Available for fresh produce, bakery, dairy, and pantry items from regional cold-chain fulfillment micro-hubs.</p>
              <span className="font-mono text-emerald-600 font-bold block">Free on orders $35+ (Otherwise $2.99)</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block text-sm">🚚 24-Hour Standard Nationwide</span>
              <p className="text-slate-600">Applies to all electronics, fashion apparel, home appliances, and certified wellness drops.</p>
              <span className="font-mono text-emerald-600 font-bold block">Free on orders $35+ (Otherwise $4.99)</span>
            </div>
          </div>
        </div>
      )}

      {/* TERMS & CONDITIONS VIEW */}
      {view === 'terms' && (
        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Terms and Conditions of Service</h1>
            <p className="text-xs text-slate-400">Effective as of January 2025</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">1. Introduction & Acceptance</h3>
            <p>Welcome to AANO BAZAR ("Platform"). By browsing, registering an account, purchasing items, or signing up as a seller or wholesale dealer, you agree to comply with and be bound by these Terms.</p>

            <h3 className="font-bold text-slate-900 text-sm">2. Account Security & Verification</h3>
            <p>Users are responsible for maintaining the confidentiality of their account credentials and one-time passwords (OTP). Any unauthorized usage must be reported to support@aanobazar.com immediately.</p>

            <h3 className="font-bold text-slate-900 text-sm">3. Pricing & Currency Conversions</h3>
            <p>All prices displayed are inclusive of applicable sales taxes unless explicitly marked. Currency exchange rates (USD, NPR, INR, EUR, GBP) are synced in real-time with international financial indices.</p>

            <h3 className="font-bold text-slate-900 text-sm">4. Merchant & Wholesale Dealer Agreements</h3>
            <p>Merchants selling on AANO BAZAR agree to deliver 100% genuine products with manufacturer warranties. Counterfeit distribution results in immediate contract termination, forfeiture of balances, and regulatory reporting.</p>
          </div>
        </div>
      )}

      {/* PRIVACY POLICY VIEW */}
      {view === 'privacy' && (
        <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Privacy & Data Protection Policy</h1>
            <p className="text-xs text-slate-400">ISO 27001 & GDPR Compliant Security</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">1. Information We Collect</h3>
            <p>We collect personal information necessary to fulfill your orders, provide AI concierge recommendations, prevent fraud, and credit wallet cashback. This includes name, delivery address, phone number, and payment token identifiers.</p>

            <h3 className="font-bold text-slate-900 text-sm">2. Payment Security & Encryption</h3>
            <p>AANO BAZAR never stores raw credit card numbers or banking passwords. All transactions are securely processed through 256-bit SSL encrypted PCI-DSS Level 1 certified gateways.</p>

            <h3 className="font-bold text-slate-900 text-sm">3. AI Shopping Assistant Safeguards</h3>
            <p>Conversations with the AanoBot AI concierge are strictly utilized to generate personalized product recommendations and are never sold to external third-party advertisers.</p>
          </div>
        </div>
      )}
    </div>
  );
};
