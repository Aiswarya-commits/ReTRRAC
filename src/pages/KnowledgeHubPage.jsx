import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  ArrowLeft,
  X, 
  ExternalLink,
  ShieldCheck, 
  Filter,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';
import { knowledgeHubArticles } from '../data/knowledgeHubData';

export default function KnowledgeHubPage({ onOpenCopilot }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  const gridTopRef = useRef(null);

  const fallbackImage = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800';

  const categories = [
    'All', 
    'Regulatory Enforcement', 
    'Crypto & FinTech', 
    'Banking Compliance', 
    'FCA & Global Authorities', 
    'Supervisory AML & Due Diligence'
  ];

  // Filter articles by category and search
  const filteredArticles = knowledgeHubArticles.filter((a) => {
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch = !searchQuery || 
                          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // If in default view (All, no search), use standard 5-page partitioning matching the 5 screenshots
  // Page 1: 12, Page 2: 12, Page 3: 12, Page 4: 12, Page 5: 7
  const isDefaultView = selectedCategory === 'All' && !searchQuery.trim();
  
  let totalPages = 5;
  let currentArticles = [];

  if (isDefaultView) {
    totalPages = 5;
    currentArticles = knowledgeHubArticles.filter(a => a.page === currentPage);
  } else {
    const itemsPerPage = 12;
    totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    currentArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }

  // Handle page change with smooth scroll to top of grid
  const handlePageChange = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages || pageNum === currentPage) return;
    setCurrentPage(pageNum);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-white pt-24 pb-24 overflow-hidden">
      
      {/* 1. HERO BANNER WITH VIBRANT FLOATING PURPLE/WHITE PARTICLES */}
      <div className="relative py-24 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white overflow-hidden">
        <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-purple-500/20" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-20 bg-indigo-500/20" />

        {/* Ambient floating purple & white particles */}
        <FloatingElements count={8} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-cyan-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Global Regulatory Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Knowledge Hub
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Stay informed on international AML fines, regulatory strategy roadmaps, supervisory precedents, and compliance advisories.
          </p>
        </div>
      </div>

      <div ref={gridTopRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        
        {/* 2. SEARCH & CATEGORY FILTER BAR */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20 scale-[1.02]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 55+ compliance articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:border-purple-600 bg-slate-50 focus:bg-white shadow-inner transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-8 pb-3 border-b border-slate-100">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{currentArticles.length}</strong> of{' '}
            <strong className="text-slate-900 font-semibold">{filteredArticles.length}</strong> articles
            {selectedCategory !== 'All' && <span> in <strong className="text-purple-700">{selectedCategory}</strong></span>}
          </span>
          <span className="font-semibold text-purple-700">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* 3. ARTICLES CARD GRID (Matches Screenshots 1 to 5) */}
        {currentArticles.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-4">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No articles found matching your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or clear the filter to browse the full knowledge catalog.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="cursor-pointer group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-purple-300 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
              >
                {/* Image Container with Hover Zoom */}
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img 
                      src={article.image || fallbackImage} 
                      alt={article.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Category Pill Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white/90 text-purple-900 backdrop-blur-md shadow-sm border border-white/80">
                        {article.category}
                      </span>
                    </div>

                    {/* Reading Time */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-100 bg-slate-950/60 backdrop-blur-md flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-purple-300" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>

                    <div className="pt-2">
                      <span className="inline-flex items-center text-xs font-bold text-purple-600 group-hover:text-purple-800 transition-colors">
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer with Date */}
                <div className="px-6 sm:px-7 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    <span>{article.date}</span>
                  </div>
                  <span className="text-[11px] text-purple-600 font-semibold group-hover:underline">
                    ReTRRAC Hub
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. PAGINATION CONTROLS (Matches Screenshot: < Previous 1 2 3 4 5 Next >) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 py-8 border-t border-slate-100">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <span>&lt; Previous</span>
            </button>

            {/* Page Numbers 1 2 3 4 5 */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30 scale-105'
                      : 'text-slate-700 hover:text-purple-600 hover:bg-slate-100'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPage === totalPages
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:text-purple-700 hover:bg-purple-50'
              }`}
            >
              <span>Next &gt;</span>
            </button>
          </div>
        )}

      </div>

      {/* 5. INTERACTIVE ARTICLE DETAIL MODAL */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Banner */}
            <div className="relative h-60 w-full bg-slate-900 overflow-hidden shrink-0">
              <img 
                src={activeArticle.image || fallbackImage} 
                alt={activeArticle.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              
              {/* Close Button */}
              <button 
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Badges */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white/90">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-purple-600 text-white">
                  {activeArticle.category}
                </span>
                <span className="flex items-center text-xs text-slate-300 font-medium">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {activeArticle.date} • {activeArticle.readTime}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {activeArticle.title}
              </h2>

              <p className="text-xs text-slate-400 font-medium">
                Published by ReTRRAC Global Intelligence Unit • UK Statutory Compliance Desk
              </p>

              <div className="text-sm text-slate-700 space-y-4 pt-2 leading-relaxed">
                <p className="font-semibold text-slate-800 text-base">
                  {activeArticle.summary}
                </p>
                
                <p>
                  This case represents a critical benchmark in statutory compliance oversight. Regulatory bodies such as the FCA, SRA, and international supervisory authorities have intensified scrutiny over procedural gaps in AML, Customer Due Diligence (CDD), and suspicious transaction monitoring.
                </p>

                <div className="p-5 rounded-2xl bg-purple-50/80 border border-purple-100 space-y-2">
                  <h4 className="font-bold text-purple-950 text-xs uppercase tracking-wider flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1.5 text-purple-600" />
                    <span>ReTRRAC Advisory Recommendation</span>
                  </h4>
                  <p className="text-xs text-purple-900 leading-relaxed">
                    Ensure your firm's Firm-Wide Risk Assessment (FWRA) or Practice-Wide Risk Assessment (PWRA) is updated annually. Implement automated continuous screening using CLM technology to prevent unexpected regulatory penalties.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => {
                  setActiveArticle(null);
                  if (onOpenCopilot) onOpenCopilot();
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs flex items-center space-x-1.5 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Ask AI Compliance Copilot</span>
              </button>

              <div className="flex items-center space-x-2">
                {activeArticle.link && (
                  <a
                    href={activeArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Original Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
