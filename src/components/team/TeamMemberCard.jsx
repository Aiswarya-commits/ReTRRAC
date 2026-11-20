import React, { useState, useEffect } from 'react';
import { MapPin, ChevronRight, X, Mail, Phone, Linkedin, Award } from 'lucide-react';

const initials = (name = '') =>
  name
    .replace(/\(.*?\)/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

/** Photo with graceful initials fallback (missing file, broken URL, or no image). */
export function TeamPhoto({ member, className = '' }) {
  const [failed, setFailed] = useState(!member.image);
  useEffect(() => setFailed(!member.image), [member.image]);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 ${className}`}>
        <span className="text-white/90 font-black tracking-tight text-4xl">{initials(member.name)}</span>
      </div>
    );
  }
  return (
    <img
      src={member.image}
      alt={`${member.name}, ${member.role}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover object-top ${className}`}
    />
  );
}

/** Portrait card used on both the home preview and the /team page. */
export default function TeamMemberCard({ member, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(member)}
      className="group text-left w-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-brand-500/10 hover:border-brand-300 transition-all duration-300 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      {/* Photo is shown on its own – the name sits below it so faces are never covered */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <TeamPhoto member={member} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />

        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-brand-900 backdrop-blur-md shadow-sm">
          {member.department}
        </span>
      </div>

      <div className="px-5 pt-4">
        <h3 className="text-base font-black text-ink leading-tight">{member.name}</h3>
        <p className="text-xs text-brand-600 font-semibold mt-1 line-clamp-2 min-h-[2rem]">{member.role}</p>
      </div>

      <div className="px-5 pb-5 pt-3 mt-auto flex items-center justify-between text-xs border-t border-slate-100">
        <span className="flex items-center text-slate-500">
          <MapPin className="w-3.5 h-3.5 mr-1 text-brand-500" />
          {member.location}
        </span>
        <span className="flex items-center font-bold text-brand-600 group-hover:text-brand-800">
          View profile
          <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </button>
  );
}

/** Full profile modal. */
export function TeamProfileModal({ member, onClose }) {
  useEffect(() => {
    if (!member) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [member, onClose]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name} profile`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-y-auto md:overflow-hidden grid grid-cols-1 md:grid-cols-5 max-h-[90vh]"
      >
        <button
          onClick={onClose}
          aria-label="Close profile"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/80 text-white backdrop-blur-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Photo column – fixed portrait shape, never cut by the write-up */}
        <div className="md:col-span-2 bg-gradient-to-br from-brand-50 via-white to-accent-50 p-5 sm:p-6 flex items-start justify-center">
          <div className="w-full max-w-[280px] md:max-w-none aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 shadow-lg shadow-brand-900/10 border-4 border-white">
            <TeamPhoto member={member} className="w-full h-full" />
          </div>
        </div>

        <div className="md:col-span-3 p-6 sm:p-8 md:overflow-y-auto md:max-h-[90vh] space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">{member.department}</span>
            <h3 className="text-2xl font-black text-ink leading-tight pr-8">{member.name}</h3>
            <p className="text-sm font-semibold text-brand-600">{member.role}</p>
            <p className="text-xs text-slate-500 flex items-center mt-1">
              <MapPin className="w-3.5 h-3.5 mr-1" /> {member.location}
            </p>
          </div>

          {member.credentials && (
            <div className="p-3 rounded-xl bg-brand-50/80 border border-brand-100 text-xs text-brand-950 font-semibold flex items-center">
              <Award className="w-4 h-4 mr-2 text-brand-600 shrink-0" />
              {member.credentials}
            </div>
          )}

          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
            <p>{member.bio}</p>
            {member.extendedBio && <p>{member.extendedBio}</p>}
          </div>

          {member.expertise?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((x) => (
                <span key={x} className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">{x}</span>
              ))}
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
            {member.email && (
              <a href={`mailto:${member.email}`} className="px-3.5 py-2 rounded-xl bg-brand-600 text-white font-bold flex items-center hover:bg-brand-700">
                <Mail className="w-3.5 h-3.5 mr-1.5" /> Email
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center hover:bg-slate-200">
                <Phone className="w-3.5 h-3.5 mr-1.5" /> Call
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="px-3.5 py-2 rounded-xl bg-brand-50 text-brand-700 font-bold flex items-center hover:bg-brand-100">
                <Linkedin className="w-3.5 h-3.5 mr-1.5" /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}