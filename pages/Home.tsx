import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { MOCK_WELLNESS_PLAN, MOCK_ACHIEVEMENTS } from '../constants';
import { 
  Sun, Cloud, CloudRain, Smile, Frown, ArrowRight, Phone, MessageCircle, 
  Sparkles, Flame, Trophy, Calendar, CheckCircle2, Play, Heart 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomeProps {
  user: User | null;
}

const QUOTES = [
  "You are stronger than you know.",
  "Your feelings are valid.",
  "Breathe. It’s just a bad day, not a bad life.",
  "You are capable of amazing things."
];

const Home: React.FC<HomeProps> = ({ user }) => {
  const [mood, setMood] = useState<string | null>(null);
  const [quote, setQuote] = useState("");
  const [streak, setStreak] = useState(4);
  const [wellnessScore, setWellnessScore] = useState(82);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const moodConfig = {
    happy: { color: 'bg-emerald-500', text: 'text-emerald-600', bgLight: 'bg-emerald-50', msg: "Glad you're feeling great! Keep it up." },
    okay: { color: 'bg-amber-500', text: 'text-amber-600', bgLight: 'bg-amber-50', msg: "A steady day is a good day." },
    lonely: { color: 'bg-blue-500', text: 'text-blue-600', bgLight: 'bg-blue-50', msg: "We are here with you." },
    sad: { color: 'bg-indigo-500', text: 'text-indigo-600', bgLight: 'bg-indigo-50', msg: "It's okay to not be okay." },
    stressed: { color: 'bg-rose-500', text: 'text-rose-600', bgLight: 'bg-rose-50', msg: "Take a deep breath." },
  };

  const currentMoodStyle = mood ? moodConfig[mood as keyof typeof moodConfig] : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Onboarding / Welcome Banner */}
      {showOnboarding && (
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl flex items-center justify-between">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="text-yellow-400" size={20} />
              Welcome to Sakhi, {user?.name.split(' ')[0]}!
            </h2>
            <p className="text-slate-300 text-sm mb-4">
              Your safe space for emotional support. Track your mood, chat with counselors, and find peace.
            </p>
            <button 
              onClick={() => setShowOnboarding(false)}
              className="bg-white text-slate-900 px-5 py-2 rounded-full text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Get Started
            </button>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <button onClick={() => setShowOnboarding(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Hero & Tracker */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Hero Section */}
          <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Heart size={120} className="text-primary-500" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">
                  {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">{user?.name.split(' ')[0]}</span>
                </h1>
                <p className="text-lg text-slate-500 font-medium italic">"{quote}"</p>
                
                <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
                   <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100 text-orange-700 font-bold text-sm">
                      <Flame size={16} className="fill-orange-500" /> {streak} Day Streak
                   </div>
                   <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 text-emerald-700 font-bold text-sm">
                      <Trophy size={16} className="fill-emerald-500" /> Level 3 Member
                   </div>
                </div>
              </div>

              {/* Wellness Score Radial */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" className="text-slate-100 stroke-current" strokeWidth="12" fill="none" />
                  <circle cx="64" cy="64" r="56" className="text-primary-500 stroke-current" strokeWidth="12" fill="none" strokeDasharray="351" strokeDashoffset={351 - (351 * wellnessScore) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-800">{wellnessScore}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Wellness</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Mood Tracker */}
          <div className={`rounded-[2.5rem] p-8 transition-colors duration-500 ${currentMoodStyle ? currentMoodStyle.bgLight : 'bg-white'} border border-slate-100 shadow-sm`}>
             <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
               How are you feeling right now?
             </h3>
             <div className="flex justify-between items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {[
                  { icon: Smile, label: 'Happy', value: 'happy', color: 'text-emerald-500', bg: 'hover:bg-emerald-100' },
                  { icon: Sun, label: 'Okay', value: 'okay', color: 'text-amber-500', bg: 'hover:bg-amber-100' },
                  { icon: Cloud, label: 'Lonely', value: 'lonely', color: 'text-blue-500', bg: 'hover:bg-blue-100' },
                  { icon: CloudRain, label: 'Sad', value: 'sad', color: 'text-indigo-500', bg: 'hover:bg-indigo-100' },
                  { icon: Frown, label: 'Stressed', value: 'stressed', color: 'text-rose-500', bg: 'hover:bg-rose-100' }
                ].map((item) => (
                   <button
                    key={item.value}
                    onClick={() => setMood(item.value)}
                    className={`flex-1 flex flex-col items-center gap-3 min-w-[80px] p-4 rounded-3xl transition-all hover:scale-105 active:scale-95 group bg-white shadow-sm border border-slate-50 ${item.bg} ${mood === item.value ? 'ring-2 ring-primary-500 scale-105' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-full bg-slate-50 group-hover:bg-white flex items-center justify-center transition-all ${item.color}`}>
                      <item.icon size={28} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{item.label}</span>
                  </button>
                ))}
             </div>
             {currentMoodStyle && (
               <div className="mt-6 p-4 bg-white/60 rounded-2xl border border-slate-200 flex items-center justify-between animate-in slide-in-from-bottom-2 fade-in">
                 <p className={`font-bold ${currentMoodStyle.text}`}>{currentMoodStyle.msg}</p>
                 <Link to="/activities" className="text-xs font-bold bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                   See recommended activities
                 </Link>
               </div>
             )}
          </div>
        </div>

        {/* Right Column: Planner & AI */}
        <div className="space-y-8">
          
          {/* Wellness Plan */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                 <Calendar className="text-primary-500" size={20} /> Today's Plan
               </h3>
               <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                 {MOCK_WELLNESS_PLAN.filter(i => i.completed).length}/{MOCK_WELLNESS_PLAN.length} Done
               </span>
            </div>
            <div className="space-y-4">
              {MOCK_WELLNESS_PLAN.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
                  <div className="relative">
                     <div className="w-0.5 h-full bg-slate-100 absolute left-2.5 -top-4 -bottom-4 -z-10"></div>
                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${item.completed ? 'bg-primary-500 border-primary-500' : 'bg-white border-slate-300 group-hover:border-primary-400'}`}>
                       {item.completed && <CheckCircle2 size={12} className="text-white" />}
                     </div>
                  </div>
                  <div className={`flex-1 p-4 rounded-2xl transition-all ${item.completed ? 'bg-slate-50 opacity-60' : 'bg-white border border-slate-100 hover:shadow-md hover:border-primary-100'}`}>
                    <h4 className={`font-bold text-sm ${item.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{item.title}</h4>
                    <p className="text-xs text-slate-400 font-bold mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistant Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-primary-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl group cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="text-yellow-300" />
              </div>
              <h3 className="text-2xl font-black mb-2">Chat with Sakhi AI</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Feeling overwhelmed? I'm here to listen and guide you through it, 24/7.
              </p>
              <Link to="/chat" className="bg-white text-primary-700 px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-lg">
                Start Conversation <ArrowRight size={16} />
              </Link>
            </div>
            {/* Character Illustration Placeholder */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl group-hover:w-40 group-hover:h-40 transition-all"></div>
          </div>

          {/* Achievements Mini */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Your Badges</h3>
            <div className="flex gap-4">
               {MOCK_ACHIEVEMENTS.map(badge => (
                 <div key={badge.id} className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-sm border ${badge.unlocked ? 'bg-amber-50 border-amber-100 text-amber-500' : 'bg-slate-50 border-slate-100 text-slate-300 grayscale'}`} title={badge.title}>
                   <Trophy size={20} />
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Bar (Quick Actions) */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-2 rounded-full flex items-center gap-2 z-50 md:bottom-10">
         <Link to="/chat" className="w-12 h-12 rounded-full bg-slate-50 hover:bg-primary-50 flex items-center justify-center text-slate-600 hover:text-primary-600 transition-colors" title="Chat">
           <MessageCircle size={20} />
         </Link>
         <Link to="/emergency" className="w-14 h-14 rounded-full bg-rose-500 hover:bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-200 transition-transform hover:scale-110 mx-2" title="SOS Help">
           <Phone size={24} />
         </Link>
         <Link to="/activities" className="w-12 h-12 rounded-full bg-slate-50 hover:bg-emerald-50 flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-colors" title="Activities">
           <Play size={20} fill="currentColor" />
         </Link>
      </div>

    </div>
  );
};

export default Home;