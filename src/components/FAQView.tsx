import React, { useState } from 'react';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, 
  MessageSquare, Sparkles, Phone, ArrowRight 
} from 'lucide-react';
import { FAQ_ITEMS } from '../data.js';
import { ActiveView } from '../types.js';

interface FAQViewProps {
  onNavigate: (view: ActiveView) => void;
  onOpenAiAssistant: () => void;
}

export const FAQView: React.FC<FAQViewProps> = ({ onNavigate, onOpenAiAssistant }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(FAQ_ITEMS[0]?.id || null);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'Ordering & Delivery', label: 'Ordering & Delivery' },
    { id: 'Payments & Cashback', label: 'Payments & Cashback' },
    { id: 'Returns & Refunds', label: 'Returns & Refunds' },
    { id: 'Product Quality & Warranty', label: 'Quality & Warranty' },
    { id: 'Sellers & Dealers', label: 'Sellers & Dealers' }
  ];

  const filteredFaqs = FAQ_ITEMS.filter(faq => {
    if (selectedCategory !== 'all' && faq.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-10">
      {/* FAQ Hero */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>Knowledge Center & Support Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Find instant answers to common questions about orders, deliveries, warranty coverage, and seller programs.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. returns, delivery speed, warranty)..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs focus:outline-none focus:border-amber-500 shadow-xs"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === c.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Accordion FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{faq.question}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-2 text-[10px] uppercase font-bold text-slate-400">
                      Category: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            No matching questions found for "{searchQuery}". Ask our AI concierge below!
          </div>
        )}
      </div>

      {/* Still need help CTA */}
      <div className="p-6 bg-amber-50 rounded-3xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h3 className="font-black text-slate-900 text-sm flex items-center justify-center sm:justify-start gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span>Still haven't found your answer?</span>
          </h3>
          <p className="text-xs text-slate-600">
            Our AI shopping concierge and live human specialists are ready to help 24/7.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAiAssistant}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-xs"
          >
            Chat with AI
          </button>
          <button
            onClick={() => onNavigate('contact-us')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Contact Help Desk
          </button>
        </div>
      </div>
    </div>
  );
};
