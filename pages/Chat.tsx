import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Shield, Lock, Info, Mic, MicOff, PhoneOff, Volume2 } from 'lucide-react';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello. I am Counselor_Care_01. I am here to listen and support you. Your identity is hidden, and our conversation is private. How are you feeling right now?",
      senderId: 'counselor',
      timestamp: new Date(),
      isSystem: false
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Timer for active call
  useEffect(() => {
    let interval: number;
    if (isCallActive) {
      interval = window.setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      senderId: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "I hear you. Can you tell me a bit more about that?",
        "It takes courage to share this. I am listening.",
        "How long have you been feeling this way?",
        "You are not alone in this. We can work through it together.",
        "That sounds difficult. How does that make you feel physically?",
        "I'm here for you. Take your time."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        senderId: 'counselor',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] flex flex-col bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden relative">
      
      {/* Call Overlay */}
      {isCallActive && (
        <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
          <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center mb-8 shadow-2xl relative">
            <div className="absolute inset-0 rounded-full border border-primary-500/30 animate-ping"></div>
            <Shield size={64} className="text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Counselor_Care_01</h2>
          <p className="text-emerald-400 font-medium mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Voice Call in Progress • {formatTime(callDuration)}
          </p>

          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-6 rounded-full transition-all ${isMuted ? 'bg-white text-slate-900' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
            >
              {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
            </button>
            
            <button 
              onClick={() => { setIsCallActive(false); setCallDuration(0); }}
              className="p-6 rounded-full bg-rose-600 text-white hover:bg-rose-700 hover:scale-110 transition-all shadow-lg shadow-rose-900/50"
            >
              <PhoneOff size={32} />
            </button>
            
            <button className="p-6 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-all">
              <Volume2 size={28} />
            </button>
          </div>
        </div>
      )}

      {/* Chat Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold border-2 border-white shadow-sm overflow-hidden">
               <Shield size={24} />
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Counselor_Care_01</h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Online • Anonymous
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setIsCallActive(true)}
             className="p-3 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-full transition-colors" 
             title="Start Voice Call"
           >
             <Phone size={20} />
           </button>
           <button className="p-3 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
             <Info size={20} />
           </button>
        </div>
      </div>

      {/* Safety Banner */}
      <div className="bg-indigo-50/50 px-4 py-2 text-xs font-medium text-indigo-900 text-center flex items-center justify-center gap-2 shrink-0 border-b border-indigo-50">
        <Lock size={12} />
        Identity Protected. Messages are encrypted and never stored.
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] md:max-w-[65%] rounded-2xl px-6 py-4 text-sm leading-relaxed shadow-sm ${
                msg.senderId === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
              }`}
            >
              {msg.text}
              <div className={`text-[10px] mt-2 opacity-70 font-medium ${msg.senderId === 'user' ? 'text-indigo-100' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-4 shadow-sm flex gap-1.5 items-center">
               <span className="text-xs text-slate-400 mr-2 font-medium">Counselor is typing</span>
               <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
               <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <div className="flex items-end gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all shadow-inner">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none p-3 max-h-32 text-sm text-slate-800 placeholder:text-slate-400 font-medium"
            rows={1}
            style={{ minHeight: '48px' }}
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-md active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      
      {/* Floating Action Buttons for quick access on mobile if needed, though header covers it */}
    </div>
  );
};

export default Chat;