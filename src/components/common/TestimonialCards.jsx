import React from 'react';
import { Star, Quote } from 'lucide-react';

/** "David M." -> "DM",  "Senior Partner & MLRO" -> "SP" */
const initialsOf = (name) =>
  name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

function Card({ t, className = '' }) {
  return (
    <div
      className={`relative bg-white rounded-3xl p-7 border border-slate-200/90 shadow-lg shadow-slate-900/5 flex flex-col justify-between gap-5 hover:border-brand-300 transition-colors ${className}`}
    >
      <Quote className="absolute top-6 right-6 w-8 h-8 text-brand-100" />
      <div className="space-y-4">
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(t.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-sm text-slate-700 leading-relaxed italic whitespace-normal">"{t.quote}"</p>
      </div>
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-tech text-white flex items-center justify-center font-black text-xs">
          {initialsOf(t.name)}
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-ink">{t.name}</h4>
          <p className="text-[11px] text-slate-500">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Shows testimonials / reviews.
 *  - 1 to 3 items: cards side by side
 *  - 4 or more:   a slow running row that pauses on hover (any number fits)
 */
export default function TestimonialCards({ items }) {
  if (!items || items.length === 0) return null;

  if (items.length <= 3) {
    const cols = items.length === 1 ? 'max-w-xl' : items.length === 2 ? 'md:grid-cols-2 max-w-4xl' : 'md:grid-cols-3';
    return (
      <div className={`grid grid-cols-1 gap-6 mx-auto ${cols}`}>
        {items.map((t, i) => <Card key={i} t={t} />)}
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden marquee-fade py-2">
      <div className="flex w-max animate-marquee-slow group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-stretch gap-6 pr-6" aria-hidden={copy === 1}>
            {items.map((t, i) => (
              <Card key={`${copy}-${i}`} t={t} className="w-[300px] sm:w-[360px] shrink-0" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
