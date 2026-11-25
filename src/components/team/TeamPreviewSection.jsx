import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TeamPhoto, TeamProfileModal } from './TeamMemberCard';
import { teamMembers } from '../../data/teamData';

// Members still waiting for a real name are left out of the home page row
// (they still appear on the /team page until their details are filled in).
const homeTeam = teamMembers.filter((m) => m.name && m.name !== 'Team Member Name');

/** Home page "Our Team" section – all team members shown side by side (static). */
export default function TeamPreviewSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="our-team" className="py-20 bg-white border-t border-slate-200/80 relative overflow-hidden">
      <div className="glow-orb w-96 h-96 -top-32 -right-32 bg-brand-500/10" />

      <div className="relative z-10">
        <h2 className="text-center text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-12 px-4">
          Our Team
        </h2>

        {/* All team members shown together (no scrolling) – click a photo for the full profile */}
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-4 sm:gap-5">
          {homeTeam.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelected(m)}
              className="group w-[calc(50%-0.5rem)] sm:w-40 lg:w-[150px] xl:w-40 shrink-0 text-left rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-md shadow-slate-900/5 hover:shadow-xl hover:shadow-brand-500/10 hover:border-brand-300 hover:-translate-y-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <div className="aspect-[4/5] bg-slate-100 overflow-hidden">
                <TeamPhoto member={m} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="px-3 py-2.5">
                <p className="text-xs font-black text-slate-900 leading-tight line-clamp-2 min-h-[2rem]">{m.name}</p>
                <p className="text-[10px] text-brand-700 font-semibold leading-snug mt-0.5 line-clamp-2">{m.role}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex justify-center px-4">
          <Link
            to="/team"
            className="group inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-gradient-tech text-white font-bold text-xs sm:text-sm shadow-lg shadow-brand-500/25 hover:opacity-95 transition-all"
          >
            <span>View All Team ({homeTeam.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <TeamProfileModal member={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
