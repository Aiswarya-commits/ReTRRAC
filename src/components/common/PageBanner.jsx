import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Light, logo-coloured page banner – the inner-page version of the home hero.
 * Every page gets the SAME banner height (360px on tablet/desktop), whatever the text length.
 * Use the same banner on every inner page so the whole site feels consistent:
 *
 *   <PageBanner
 *     title="Our Story"
 *     highlight="Story"                       // optional: word(s) shown in logo blue
 *     subtitle="Short one-line description"
 *     image="/ourstory.jpg"                   // optional faint background photo
 *     crumb="Our Story"                       // optional breadcrumb label (defaults to title)
 *     parent={{ label: 'Consulting', to: '/compliance-consulting' }} // optional middle breadcrumb
 *   />
 */
export default function PageBanner({ title, highlight, subtitle, image, crumb, parent, children }) {
  // Split the title so the highlighted word(s) can be coloured
  let before = title;
  let after = '';
  if (highlight && title.includes(highlight)) {
    const i = title.indexOf(highlight);
    before = title.slice(0, i);
    after = title.slice(i + highlight.length);
  }

  return (
    <div className="px-3 sm:px-6 lg:px-8 pt-10 sm:pt-12">
      <div className="page-banner relative max-w-[1400px] mx-auto min-h-[300px] md:h-[360px] flex items-center justify-center rounded-[28px] sm:rounded-[36px] overflow-hidden border border-brand-100 shadow-xl shadow-brand-900/5 bg-gradient-to-br from-white via-brand-50 to-[#fdf3ec]">

        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-brand-300/40 blur-[100px]" />
          <div className="absolute -bottom-40 right-0 w-[460px] h-[380px] rounded-full bg-accent-300/30 blur-[110px]" />

          {image && (
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.18] grayscale-[35%]"
            />
          )}

          {/* White glow keeps the text area bright and readable */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_70%_at_50%_50%,rgba(255,255,255,0.85),rgba(255,255,255,0.45)_60%,transparent_85%)]" />

          {/* Logo motif: three connected dots */}
          <svg className="absolute -right-6 -top-6 w-56 h-56 opacity-[0.09] hidden md:block" viewBox="0 0 200 200" fill="none">
            <path d="M50 100 L100 100 L135 55 M100 100 L135 145" stroke="#1f6acb" strokeWidth="14" strokeLinecap="round" />
            <circle cx="45" cy="100" r="30" fill="#1f9ff6" />
            <circle cx="140" cy="50" r="30" fill="#1f82df" />
            <circle cx="140" cy="150" r="30" fill="#1f6acb" />
          </svg>
        </div>

        <div className="relative z-10 w-full px-6 py-12 md:py-0 text-center max-w-5xl mx-auto space-y-4">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Link to="/" className="hover:text-brand-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            {parent && (
              <>
                <Link to={parent.to} className="hover:text-brand-700 transition-colors">{parent.label}</Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </>
            )}
            <span className="text-accent-600">{crumb || title}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-ink leading-[1.1]">
            {before}
            {highlight && <span className="text-gradient">{highlight}</span>}
            {after}
          </h1>

          {subtitle && (
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed md:line-clamp-3">
              {subtitle}
            </p>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}