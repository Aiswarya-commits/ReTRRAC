import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { aiPresetPrompts, aiKnowledgeResponses } from '../../data/aiKnowledgeBase';
import { api } from '../../lib/api';

export default function AiComplianceCopilot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I am **ReTRRAC AI Compliance Copilot**, trained on UK Money Laundering Regulations (MLR 2017), FCA/PRA regulatory frameworks, SRA legal rules, and ReTRRAC's CLM RegTech methodology.\n\nHow can I assist your firm's compliance or training objectives today?`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add user message
    const userMsg = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    api('/api/ai/advisor', { method: 'POST', body: { message: query } })
      .then(data => {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
        setIsTyping(false);
      })
      .catch(() => {
        // Local fallback knowledge
        const lower = query.toLowerCase();
        let matchedResponse = null;

        for (const [key, item] of Object.entries(aiKnowledgeResponses)) {
          if (item.keywords.some((k) => lower.includes(k))) {
            matchedResponse = item.content;
            break;
          }
        }

        if (!matchedResponse) {
          if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("paypal")) {
            matchedResponse = "Tuition for our flagship **CAFS™ (Certified Anti-Financial Crime Specialist)** programme is £1,250 GBP (or ₹1,25,000 INR), payable securely via PayPal. This includes 40 hours of lecture instruction, 20 hours of hands-on LIVE client project simulation, mock interviews, and CPD UK certification.\n\nBlackthrone™ Simulation War Rooms are £850 GBP / ₹85,000 INR.";
          } else if (lower.includes("contact") || lower.includes("phone") || lower.includes("office")) {
            matchedResponse = "You can contact ReTRRAC Global at:\n• **London Global HQ**: 60 Cannon Street, London EC4N 6NP (Tel: +44 7552 237 997)\n• **Pune Resource Center**: Pune, India (Tel: +91 7709991797)\n• **Email**: ren@retrrac.org / info@retrrac.org";
          } else {
            matchedResponse = `Thank you for your question regarding regulatory compliance. ReTRRAC specializes in customized AML/KYC review, Firm-wide Risk Assessments (FWRA/PWRA), and RegTech onboarding systems across the UK, EU, UAE, and India.\n\nWould you like to explore our **5 Consulting Sectors**, run the **AI Risk Audit Scanner**, or enroll in our **CAFS™ Certification** via PayPal?`;
          }
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: matchedResponse }]);
        setIsTyping(false);
      });
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Chat cleared. Ask me anything about MLR 2017, Customer Due Diligence (CDD), Firm-wide Risk Assessments, or ReTRRAC Academy!`
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-xl h-full sm:h-[92vh] bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center shadow">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm text-white">ReTRRAC AI Copilot</h3>
                <span className="text-[10px] bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold border border-cyan-400/30">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-slate-400">UK MLR 2017 & RegTech Advisor</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleResetChat}
              title="Reset conversation"
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preset Prompt Chips */}
        <div className="p-3 bg-purple-50/70 border-b border-purple-100 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center space-x-2">
          <span className="text-[10px] uppercase font-bold text-purple-700 shrink-0">Quick Queries:</span>
          {aiPresetPrompts.slice(0, 4).map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-white text-slate-700 hover:bg-indigo-600 hover:text-white border border-purple-200 transition-colors shrink-0 shadow-sm"
            >
              {chip.length > 36 ? chip.substring(0, 36) + '...' : chip}
            </button>
          ))}
        </div>

        {/* Chat History Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg, index) => {
            const isBot = msg.role === 'assistant';
            return (
              <div
                key={index}
                className={`flex items-start space-x-3 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isBot ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-white'
                  }`}>
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`p-4 rounded-2xl text-xs sm:text-sm max-w-[85%] leading-relaxed ${isBot
                    ? 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                    : 'bg-gradient-tech text-white shadow-md'
                  }`}>
                  <div className="whitespace-pre-line">
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs pl-11">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-100" />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-200" />
              <span>Analyzing regulatory guidance...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask about MLR 2017, FWRA, CAFS™ certification..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 bg-slate-50 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-3 rounded-xl bg-gradient-tech text-white hover:opacity-95 disabled:opacity-40 transition-all shadow-md shadow-indigo-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400 px-1">
            <span>Powered by ReTRRAC Compliance Intelligence</span>
            <span>London • UK MLR 2017 Standards</span>
          </div>
        </div>
      </div>
    </div>
  );
}
