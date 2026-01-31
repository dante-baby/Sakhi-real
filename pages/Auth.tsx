import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ArrowRight } from 'lucide-react';
import { User, UserRole, AgeGroup } from '../types';
import { Logo } from '../components/Logo';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('Under 18');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleAnonymous = () => {
    onLogin({
      id: `anon_${Math.random().toString(36).substr(2, 9)}`,
      name: 'Anonymous Friend',
      isAnonymous: true,
      role: UserRole.GUEST,
      ageGroup: ageGroup
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: `user_${Math.random().toString(36).substr(2, 9)}`,
      name: formData.name || 'Friend',
      isAnonymous: false,
      role: UserRole.USER,
      ageGroup: ageGroup
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-white/90 backdrop-blur-xl w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-white relative z-10">
        
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-white p-3 rounded-2xl shadow-md mb-4 ring-1 ring-slate-100">
               <Logo className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Sakhi</h1>
            <p className="text-slate-500 font-medium mt-2">A secure place for your mind & heart.</p>
          </div>

          <div className="bg-slate-50 p-1.5 rounded-xl flex mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                   <button
                     type="button"
                     onClick={() => setAgeGroup('Under 18')}
                     className={`p-3 rounded-xl border-2 text-center text-sm font-bold transition-all ${ageGroup === 'Under 18' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-100 bg-white text-slate-500'}`}
                   >
                     Under 18
                   </button>
                   <button
                     type="button"
                     onClick={() => setAgeGroup('College Student')}
                     className={`p-3 rounded-xl border-2 text-center text-sm font-bold transition-all ${ageGroup === 'College Student' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-100 bg-white text-slate-500'}`}
                   >
                     College
                   </button>
                </div>
                <div>
                  <input 
                    type="text" 
                    className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-400/50 font-medium text-slate-800"
                    placeholder="Nickname (Optional)"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </>
            )}
            
            <div>
              <input 
                type="email" 
                required
                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-400/50 font-medium text-slate-800"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-400/50 font-medium text-slate-800 pr-12"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[18px] text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLogin ? 'Access Dashboard' : 'Start Your Journey'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6">
            <button 
              onClick={handleAnonymous}
              className="w-full bg-white hover:bg-slate-50 text-slate-600 font-bold py-3.5 rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <Lock size={18} />
              Continue Anonymously
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            By continuing, you agree to our Terms. Your data is encrypted and we prioritize your anonymity and safety above all else.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;