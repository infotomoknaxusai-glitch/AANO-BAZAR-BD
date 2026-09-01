import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, MessageSquare, 
  Send, CheckCircle2, Headphones, Store, Building 
} from 'lucide-react';

export const ContactUsView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Tracking & Support',
    orderNumber: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-8 md:p-14 shadow-2xl border border-slate-800">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5" />
            <span>24/7 Customer Care & Inquiries</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            We're Here to Help You
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Have a question regarding your recent order, product authenticity, or wholesale dealership? Reach out to our dedicated support concierges via phone, email, or live ticket below.
          </p>
        </div>
      </div>

      {/* Support Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Customer Helpline</h3>
          <p className="text-xs text-slate-500">Available 24 hours a day, 7 days a week.</p>
          <div className="text-xs font-mono font-bold text-slate-900 pt-1 space-y-1">
            <p>Toll-Free: +1 (800) 422-AANO</p>
            <p>Direct HQ: +977 1-492800</p>
            <p className="text-emerald-600">WhatsApp: +977 9801-AANO-BZ</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Email Desks</h3>
          <p className="text-xs text-slate-500">Average response time within 45 minutes.</p>
          <div className="text-xs text-slate-900 pt-1 space-y-1">
            <p><span className="text-slate-400">General Support:</span> support@aanobazar.com</p>
            <p><span className="text-slate-400">Seller Onboarding:</span> seller@aanobazar.com</p>
            <p><span className="text-slate-400">Wholesale B2B:</span> dealer@aanobazar.com</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Main Logistics & HQ</h3>
          <p className="text-xs text-slate-500">Central distribution & fulfillment hub.</p>
          <div className="text-xs text-slate-900 pt-1 space-y-1">
            <p className="font-medium">AANO BAZAR Global Logistics Center</p>
            <p className="text-slate-500">Trade Tower 4, Valley Plaza, Kathmandu</p>
            <p className="text-slate-400">Mon - Sat: 8:00 AM - 9:00 PM</p>
          </div>
        </div>
      </div>

      {/* Interactive Contact Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Send an Inquiry to Our Support Team</h2>
          <p className="text-xs text-slate-500">
            Submit your message and our customer care specialist will respond within 2 hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-950">Ticket #AB-{Math.floor(100000 + Math.random() * 900000)} Created</h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Thank you, <strong>{formData.name}</strong>. Your inquiry has been routed to our priority response queue. We've sent a confirmation email to <strong>{formData.email}</strong>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs cursor-pointer hover:bg-emerald-700"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Giri"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@domain.com"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Contact Reason / Department *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 bg-white"
                >
                  <option value="Order Tracking & Support">Order Tracking & Support</option>
                  <option value="Return & Refund Request">Return & Refund Request</option>
                  <option value="Product Authenticity & Warranty">Product Authenticity & Warranty</option>
                  <option value="Become a Seller">Become a Seller</option>
                  <option value="Wholesale Dealer Inquiry">Wholesale Dealer Inquiry</option>
                  <option value="Billing & Cashback Issue">Billing & Cashback Issue</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Order ID (If Applicable)</label>
                <input
                  type="text"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  placeholder="e.g. AB-89241"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Your Message *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your inquiry or question in detail..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to Support</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
