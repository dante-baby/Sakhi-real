import React, { useState } from 'react';
import { BrainCircuit, CheckCircle, PenTool, Activity, ChevronRight, RefreshCw, Smile } from 'lucide-react';
import { ASSESSMENT_QUESTIONS, GUIDED_QUESTIONS, INITIAL_DAILY_TASKS } from '../constants';

const Activities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'assess' | 'express'>('daily');
  const [dailyTasks, setDailyTasks] = useState(INITIAL_DAILY_TASKS);
  
  // Assessment State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const toggleTask = (id: string) => {
    setDailyTasks(tasks => tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAnswer = (optionScore: number) => {
    const newScore = score + optionScore;
    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setScore(newScore);
      setCurrentQuestion(prev => prev + 1);
    } else {
      setScore(newScore);
      setShowResult(true);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const getAssessmentResult = () => {
    const maxScore = ASSESSMENT_QUESTIONS.length * 3;
    const percentage = score / maxScore;
    
    if (percentage < 0.3) return { level: 'Low Stress', color: 'text-emerald-600', bg: 'bg-emerald-50', msg: "You seem to be doing okay. Keep up your healthy habits!" };
    if (percentage < 0.7) return { level: 'Moderate Stress', color: 'text-amber-600', bg: 'bg-amber-50', msg: "You might be feeling a bit overwhelmed. Try some relaxation techniques." };
    return { level: 'High Stress', color: 'text-rose-600', bg: 'bg-rose-50', msg: "It seems like you are going through a tough time. Please consider talking to a counselor." };
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Wellness Activities</h1>
           <p className="text-slate-500 font-medium mt-1">Small steps for a healthier mind.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-full md:w-fit overflow-x-auto">
        <button 
          onClick={() => setActiveTab('daily')}
          className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'daily' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Daily Tasks
        </button>
        <button 
          onClick={() => setActiveTab('assess')}
          className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'assess' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Self Assessment
        </button>
        <button 
          onClick={() => setActiveTab('express')}
          className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'express' ? 'bg-primary-50 text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Express Yourself
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-8 min-h-[400px]">
        
        {/* Daily Tasks Content */}
        {activeTab === 'daily' && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="text-primary-500" /> Today's Goals
            </h2>
            <div className="grid gap-4">
              {dailyTasks.map(task => (
                <button 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center p-4 rounded-2xl border-2 transition-all text-left group ${
                    task.completed 
                      ? 'bg-emerald-50 border-emerald-200 opacity-70' 
                      : 'bg-white border-slate-100 hover:border-primary-200'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${
                    task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 group-hover:border-primary-400'
                  }`}>
                    {task.completed && <CheckCircle size={14} className="text-white" />}
                  </div>
                  <span className={`font-medium ${task.completed ? 'text-emerald-800 line-through' : 'text-slate-700'}`}>
                    {task.title}
                  </span>
                </button>
              ))}
            </div>
            {dailyTasks.every(t => t.completed) && (
              <div className="mt-8 p-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl text-white text-center">
                <Smile size={48} className="mx-auto mb-2 text-white/90" />
                <h3 className="text-xl font-bold">Amazing Job!</h3>
                <p className="opacity-90">You've completed all your tasks for today.</p>
              </div>
            )}
          </div>
        )}

        {/* Self Assessment Content */}
        {activeTab === 'assess' && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300 max-w-2xl mx-auto">
             {!showResult ? (
               <>
                 <div className="mb-8">
                   <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                     <span>Question {currentQuestion + 1} of {ASSESSMENT_QUESTIONS.length}</span>
                     <span>Self-Check</span>
                   </div>
                   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-primary-500 transition-all duration-500"
                       style={{ width: `${((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                     ></div>
                   </div>
                 </div>
                 
                 <h2 className="text-2xl font-bold text-slate-800 mb-8">{ASSESSMENT_QUESTIONS[currentQuestion].text}</h2>
                 
                 <div className="grid gap-3">
                   {ASSESSMENT_QUESTIONS[currentQuestion].options.map((opt, idx) => (
                     <button
                       key={idx}
                       onClick={() => handleAnswer(opt.score)}
                       className="w-full p-5 rounded-2xl bg-slate-50 hover:bg-slate-800 hover:text-white text-left font-bold text-slate-700 transition-all active:scale-95 flex justify-between items-center group"
                     >
                       {opt.label}
                       <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                     </button>
                   ))}
                 </div>
               </>
             ) : (
               <div className="text-center py-8">
                 <div className={`inline-block p-4 rounded-full ${getAssessmentResult().bg} mb-6`}>
                   <BrainCircuit size={48} className={getAssessmentResult().color} />
                 </div>
                 <h2 className="text-3xl font-bold text-slate-800 mb-2">{getAssessmentResult().level}</h2>
                 <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">{getAssessmentResult().msg}</p>
                 
                 <button 
                   onClick={resetAssessment}
                   className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition-colors inline-flex items-center gap-2"
                 >
                   <RefreshCw size={18} /> Retake Test
                 </button>
               </div>
             )}
          </div>
        )}

        {/* Expression Content */}
        {activeTab === 'express' && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
             <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <PenTool className="text-primary-500" /> Guided Journaling
            </h2>
            <div className="grid gap-8">
              {GUIDED_QUESTIONS.map((q, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <label className="block text-lg font-bold text-slate-700 mb-3">{q}</label>
                  <textarea 
                    className="w-full bg-white rounded-xl border border-slate-200 p-4 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 min-h-[100px] resize-none transition-shadow"
                    placeholder="Type your thoughts here..."
                  ></textarea>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Activities;