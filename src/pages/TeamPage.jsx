import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, X, ArrowRight, Briefcase } from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';
import TeamMemberCard, { TeamProfileModal } from '../components/team/TeamMemberCard';
import { teamMembers, teamDepartments } from '../data/teamData';

export default function TeamPage() {
  const [department, setDepartment] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const counts = useMemo(() => {
    const c = { All: teamMembers.length };
    teamMembers.forEach((m) => { c[m.department] = (c[m.department] || 0) + 1; });
    return c;
  }, []);

  const visible = teamMembers.filter((m) => {
    const inDept = department === 'All' || m.department === department;
    const q = query.trim().toLowerCase();
    const matches = !q || [m.name, m.role, m.location, ...(m.expertise || [])].join(' ').toLowerCase().includes(q);
    return inDept && matches;
  });

  const offices = new Set(teamMembers.map((m) => m.location.split(',')[0])).size;

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">

      {/* Hero */}
      <div className="relative py-24 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white overflow-hidden">
        <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-purple-500/20" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-20 bg-indigo-500/20" />
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-cyan-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>London • Pune • Kochi • Dubai</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">Our Team</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Compliance leaders, analysts, technologists and trainers united by one goal – keeping regulated firms ahead of financial crime.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3 text-xs">
            {[
              [teamMembers.length, 'Team members'],
              [teamDepartments.length - 1, 'Practice areas'],
              [offices, 'Office locations']
            ].map(([n, label]) => (
              <div key={label} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="block text-2xl font-black text-white">{n}</span>
                <span className="text-slate-400 font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

        {/* Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {teamDepartments.map((d) => (
              <button
                key={d}
                onClick={() => setDepartment(d)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  department === d
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {d} <span className="opacity-70">({counts[d] || 0})</span>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, role or expertise…"
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:border-purple-600 bg-slate-50 focus:bg-white"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-3">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No team members match your search.</p>
            <button onClick={() => { setDepartment('All'); setQuery(''); }} className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs">
              Show everyone
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {visible.map((m) => (
              <TeamMemberCard key={m.id} member={m} onOpen={setSelected} />
            ))}
          </div>
        )}

        {/* Join us CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-cyan-300">
              <Briefcase className="w-3.5 h-3.5 mr-1.5" /> Careers
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">Want to join the team?</h3>
            <p className="text-xs sm:text-sm text-purple-200 max-w-lg">
              We’re always looking for analysts, trainers and interns who care about fighting financial crime.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link to="/internship-career" className="px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-xs shadow-xl hover:bg-slate-100 flex items-center">
              View Opportunities <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
            <Link to="/contact" className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <TeamProfileModal member={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
