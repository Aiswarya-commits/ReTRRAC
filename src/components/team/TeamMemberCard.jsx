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
      <div className={`flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 ${className}`}>
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
      className={`object-cover ${className}`}
    />
  );
}

/** Portrait card used on both the home preview and the /team page. */
export default function TeamMemberCard({ member, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(member)}
      className="group text-left w-full bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-300 transition-all duration-300 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <TeamPhoto member={member} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />

        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-purple-900 backdrop-blur-md">
          {member.department}
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-lg font-black leading-tight">{member.name}</h3>
          <p className="text-xs text-cyan-200 font-semibold mt-0.5">{member.role}</p>
        </div>
      </div>

      <div className="p-5 flex items-center justify-between text-xs">
        <span className="flex items-center text-slate-500">
          <MapPin className="w-3.5 h-3.5 mr-1 text-purple-500" />
          {member.location}
        </span>
        <span className="flex items-center font-bold text-indigo-600 group-hover:text-indigo-800">
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
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-5 max-h-[90vh]"
      >
        <button
          onClick={onClose}
          aria-label="Close profile"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="md:col-span-2 relative h-64 md:h-auto bg-slate-100">
          <TeamPhoto member={member} className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent md:hidden" />
        </div>

        <div className="md:col-span-3 p-6 sm:p-8 overflow-y-auto space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">{member.department}</span>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">{member.name}</h3>
            <p className="text-sm font-semibold text-indigo-600">{member.role}</p>
            <p className="text-xs text-slate-500 flex items-center mt-1">
              <MapPin className="w-3.5 h-3.5 mr-1" /> {member.location}
            </p>
          </div>

          {member.credentials && (
            <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-100 text-xs text-purple-950 font-semibold flex items-center">
              <Award className="w-4 h-4 mr-2 text-purple-600 shrink-0" />
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
              <a href={`mailto:${member.email}`} className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold flex items-center hover:bg-slate-800">
                <Mail className="w-3.5 h-3.5 mr-1.5" /> Email
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center hover:bg-slate-200">
                <Phone className="w-3.5 h-3.5 mr-1.5" /> Call
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noreferrer" className="px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center hover:bg-indigo-100">
                <Linkedin className="w-3.5 h-3.5 mr-1.5" /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
