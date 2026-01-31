import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  MessageCircle, 
  Users, 
  AlertCircle, 
  LogOut, 
  ChevronLeft,
  BrainCircuit,
  Settings
} from 'lucide-react';
import { User } from '../types';
import { Logo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickExit = () => {
    window.location.replace("https://www.google.com");
  };

  const navItems = [
    { name: 'Dashboard', path: '/home', icon: Home },
    { name: 'Activities', path: '/activities', icon: BrainCircuit },
    { name: 'Library', path: '/awareness', icon: BookOpen },
    { name: 'Counseling', path: '/chat', icon: MessageCircle },
    { name: 'Community', path: '/forum', icon: Users },
  ];

  const showBackButton = location.pathname !== '/home';

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col md:flex-row font-sans text-slate-800 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      
      {/* Quick Exit Button - Always Visible & Accessible */}
      <div className="fixed bottom-24 right-4 md:top-6 md:right-6 md:bottom-auto z-50">
        <button 
          onClick={handleQuickExit}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-5 rounded-full shadow-lg shadow-rose-200 flex items-center gap-2 transition-transform hover:scale-105"
          title="Leave this site immediately"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Quick Exit</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/50 shadow-sm h-screen sticky top-0 z-40">
        <div className="p-8 flex items-center gap-3">
          <Logo className="w-12 h-12" />
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 tracking-tight font-['Plus_Jakarta_Sans']">Sakhi</span>
        </div>

        <nav className="flex-1 px-6 space-y-2 mt-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">Main Menu</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary-50 to-indigo-50 text-primary-700 shadow-sm translate-x-1' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={22} className={isActive ? "text-primary-600" : ""} />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
          
          <div className="mt-8">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">Support</div>
             <NavLink
              to="/emergency"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold ${
                  isActive 
                    ? 'bg-rose-50 text-rose-600 shadow-sm ring-1 ring-rose-200' 
                    : 'text-rose-500 hover:bg-rose-50'
                }`
              }
            >
              <AlertCircle size={22} />
              Immediate Care
            </NavLink>
          </div>
        </nav>

        <div className="p-6 border-t border-slate-100">
          <div className="flex items-center gap-3 bg-gradient-to-br from-indigo-50 to-primary-50 p-3 rounded-2xl mb-3 shadow-inner">
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary-600 font-bold border-2 border-white shadow-sm">
               {user?.isAnonymous ? 'A' : user?.name.charAt(0)}
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
               <p className="text-[10px] uppercase font-bold text-slate-400 truncate tracking-wide">{user?.ageGroup || 'User'}</p>
             </div>
             <Settings size={16} className="text-slate-400" />
          </div>
          <button 
            onClick={onLogout}
            className="w-full text-center py-2 text-xs font-bold text-slate-400 hover:text-rose-500 hover:underline transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          {showBackButton ? (
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
            <Logo className="w-9 h-9" />
          )}
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
            {showBackButton ? 'Back' : 'Sakhi'}
          </span>
        </div>
        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-bold border border-primary-200">
          {user?.name.charAt(0)}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 md:pb-8 p-4 md:p-8 max-w-[1400px] mx-auto w-full relative">
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)}
            className="hidden md:flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold mb-6 transition-colors bg-white/50 px-4 py-2 rounded-xl w-fit hover:bg-white"
          >
            <ChevronLeft size={20} />
            Back
          </button>
        )}
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 px-2 py-2 flex justify-around items-center z-40 pb-safe shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 p-2 rounded-xl transition-all min-w-[60px] ${
                isActive ? 'text-primary-600' : 'text-slate-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;