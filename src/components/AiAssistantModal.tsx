import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Sparkles, Send, Bot, User, ArrowRight, 
  ShoppingBag, Zap, RefreshCw, Star 
} from 'lucide-react';
import { Product, Currency, CategoryId, ActiveView } from '../types.js';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'view_product' | 'navigate_category' | 'navigate_deals';
    payload: string;
    label: string;
  };
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  allProducts: Product[];
  onSelectProduct: (p: Product) => void;
  onNavigate: (view: ActiveView, categoryId?: CategoryId) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  currency,
  allProducts,
  onSelectProduct,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: "Namaste & Welcome to AANO BAZAR! I'm AanoBot, your AI Shopping Concierge. I can help you find products, compare technical specifications, check warranty details, or calculate your wallet cashback rewards. What are you shopping for today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Recommend top noise-cancelling headphones",
    "What are the benefits of Himalayan Shilajit?",
    "Find fresh organic grocery staples",
    "Explain the 15-day return policy"
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (userText?: string) => {
    const textToSend = userText || inputValue;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!userText) setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          context: {
            currency: currency.code,
            availableCategories: ['Grocery', 'Electronics', 'Fashion', 'Beauty', 'Health & Wellness', 'Home & Kitchen', 'Mobile & Accessories']
          }
        })
      });

      if (!response.ok) {
        throw new Error('AI assistant response error');
      }

      const data = await response.json();
      const botMessage: Message = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: data.reply || "I've analyzed our catalog. Let me know if you would like me to compare specific products or check stock levels!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      // Fallback smart response
      let fallbackText = "I found top picks for you in our catalog! AANO BAZAR offers 100% genuine guaranteed items with 15-day hassle-free returns and instant wallet cashback.";
      if (textToSend.toLowerCase().includes('headphone') || textToSend.toLowerCase().includes('sound')) {
        fallbackText = "I recommend our **SonicPro Master ANC Headphones** ($249.00) featuring 42dB Active Noise Cancellation, 60-hour battery life, and 12% instant cashback! They have a 4.9★ rating from over 840 verified buyers.";
      } else if (textToSend.toLowerCase().includes('return') || textToSend.toLowerCase().includes('refund')) {
        fallbackText = "AANO BAZAR provides a **15-Day Hassle-Free Doorstep Return Policy**. Our courier collects the item directly from your address at no cost, and your refund is credited to your AANO Wallet immediately.";
      } else if (textToSend.toLowerCase().includes('shilajit') || textToSend.toLowerCase().includes('health')) {
        fallbackText = "Our **100% Pure Himalayan Gold Shilajit Resin** (20g at $48.00) is wild-harvested at 18,000+ feet with 85+ trace ionic minerals and 70%+ fulvic acid. It comes with a third-party laboratory certificate.";
      }

      const botMessage: Message = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl h-[85vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col justify-between">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-white">AanoBot AI Concierge</h3>
                <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  Gemini 2.5 Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Your personalized 24/7 smart shopping guide</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-xs ${
                m.sender === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-xs'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs space-y-2'
              }`}>
                <div className="whitespace-pre-line">{m.text}</div>
                <span className={`block text-[9px] text-right font-mono ${m.sender === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>
                  {m.timestamp}
                </span>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs pl-2">
              <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0">Ideas:</span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 transition-colors whitespace-nowrap cursor-pointer shrink-0 font-medium text-slate-700"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Form Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about products, specs, deals, or delivery speeds..."
              className="flex-1 p-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs focus:outline-none focus:border-amber-500 shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 rounded-2xl font-bold transition-colors cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
