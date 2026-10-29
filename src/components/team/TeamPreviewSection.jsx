import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import TeamMemberCard, { TeamProfileModal } from './TeamMemberCard';
import { featuredTeam, teamMembers } from '../../data/teamData';

/** Home page "Our Team" section – 3 featured people + "View All Team" button. */
export default function TeamPreviewSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="our-team" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden">
      <div className="glow-orb w-96 h-96 -top-32 -right-32 bg-purple-500/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-800 border border-purple-200">
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>Our Team</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            The people behind <span className="text-gradient">ReTRRAC</span>.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Former Tier-1 banking leaders, regulatory specialists and trainers working across London, India and the UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featuredTeam.map((m) => (
            <TeamMemberCard key={m.id} member={m} onOpen={setSelected} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/team"
            className="group inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-gradient-tech text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
          >
            <span>View All Team ({teamMembers.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <TeamProfileModal member={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
