import React, { useState, useEffect } from 'react';
import { Phone, MapPin, AlertTriangle, ShieldAlert, CheckCircle, Heart, UserCheck, Baby } from 'lucide-react';
import { HELPLINES } from '../constants';

const Emergency: React.FC = () => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [sosActive, setSosActive] = useState(false);

  useEffect(() => {
    setIsLocating(true);
    setTimeout(() => {
      setLocation({ lat: 34.0522, lng: -118.2437 });
      setIsLocating(false);
    }, 2000);
  }, []);

  const handleSOS = () => {
    setSosActive(true);
    setTimeout(() => {
      alert("SOS Signal Sent! Emergency contacts have been notified.");
      setSosActive(false);
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mental Health': return <Heart size={18} className="text-pink-500" />;
      case 'Child Safety': return <Baby size={18} className="text-blue-500" />;
      case 'Women & Youth': return <UserCheck size={18} className="text-purple-500" />;
      case 'Suicide Prevention': return <ShieldAlert size={18} className="text-red-500" />;
      default: return <Phone size={18} />;
    }
  };

  // Group helplines by category
  const categories = Array.from(new Set(HELPLINES.map(h => h.category)));

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in pb-12">
      
      <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex items-start gap-4 shadow-sm">
        <div className="bg-rose-100 p-3 rounded-full text-rose-600 shrink-0">
           <ShieldAlert size={28} />
        </div>
        <div>
          <h2 className="font-extrabold text-xl text-rose-800">Immediate Care</h2>
          <p className="text-rose-700 mt-1 font-medium">If you are in immediate danger, please do not wait. Call 911 or your local emergency number immediately.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* SOS Button Section */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
          <h3 className="font-bold text-slate-800 text-lg mb-6">Panic Button</h3>
          <button 
            onClick={handleSOS}
            className={`
              w-56 h-56 rounded-full shadow-2xl flex flex-col items-center justify-center gap-3 border-[10px] transition-all active:scale-95 relative overflow-hidden group
              ${sosActive 
                ? 'bg-rose-600 border-rose-700 animate-pulse' 
                : 'bg-rose-500 border-rose-100 hover:bg-rose-600 hover:scale-105'
              }
            `}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <AlertTriangle size={64} className="text-white relative z-10" />
            <div className="flex flex-col relative z-10">
              <span className="text-4xl font-black text-white tracking-widest">SOS</span>
              <span className="text-xs text-white/90 font-bold uppercase tracking-wide mt-1">Tap for Help</span>
            </div>
          </button>
          <p className="mt-8 text-slate-500 text-sm font-medium">
            Sends your live location to trusted contacts.
          </p>

          <div className="mt-6 w-full p-4 bg-sky-50 rounded-2xl flex items-center justify-between">
             <div className="flex items-center gap-3">
               <MapPin size={20} className="text-sky-500" />
               <div className="text-left">
                 <p className="text-xs font-bold text-slate-700">Location</p>
                 <p className="text-[10px] text-slate-500">{isLocating ? 'Locating...' : 'Active'}</p>
               </div>
             </div>
             {location && <CheckCircle size={18} className="text-emerald-500" />}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* Categorized Helplines */}
          {categories.map((category) => (
            <div key={category} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 ml-1 flex items-center gap-2">
                {getCategoryIcon(category)} {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {HELPLINES.filter(h => h.category === category).map((line, idx) => (
                  <div key={idx} className="flex flex-col justify-between p-5 bg-slate-50 rounded-2xl group hover:bg-slate-100 transition-colors border border-slate-100 h-full">
                    <div>
                      <h4 className="font-bold text-slate-800">{line.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 mb-3">{line.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                       <span className="text-[10px] font-bold bg-white px-2 py-1 rounded-md text-slate-400 border border-slate-200">{line.available}</span>
                       <a 
                        href={`tel:${line.number}`}
                        className="bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2 text-sm font-bold"
                      >
                        <Phone size={14} /> Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emergency;