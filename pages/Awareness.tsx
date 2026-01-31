import React, { useState } from 'react';
import { MOCK_ARTICLES } from '../constants';
import { Search, PlayCircle, FileText, ChevronRight } from 'lucide-react';

const Awareness: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Mental Health', 'Career Stress', 'Peer Pressure', 'Family', 'Abuse Awareness'];

  const filteredArticles = MOCK_ARTICLES.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Library</h1>
           <p className="text-slate-500 font-medium mt-1">Curated resources for your well-being.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search for topics..." 
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-100 shadow-sm text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
        </div>
      </div>

      {/* Modern Filter Pills */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
              activeCategory === cat 
                ? 'bg-slate-800 text-white border-slate-800 shadow-md transform scale-105' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry-style Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100 group flex flex-col h-full">
            <div className="relative h-56 overflow-hidden">
              <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                 {article.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
                 {article.type === 'Video' ? <PlayCircle size={14} className="text-rose-500" /> : <FileText size={14} className="text-indigo-500" />}
                 <span>{article.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">{article.title}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-3">{article.description}</p>
              
              <button className="w-full py-3.5 rounded-xl bg-slate-50 text-slate-700 font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-center gap-2">
                {article.type === 'Video' ? 'Watch Now' : 'Read Article'}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 font-medium">No results found for "{searchQuery}"</p>
          <button onClick={() => {setSearchQuery(''); setActiveCategory('All');}} className="text-primary-600 font-bold mt-2 hover:underline">Clear all filters</button>
        </div>
      )}
    </div>
  );
};

export default Awareness;