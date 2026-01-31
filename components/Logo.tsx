import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 
        For the production app, place your 'Sakhi' logo file (sakhi-logo.png) in the public folder 
        and update the src below to: src="/sakhi-logo.png"
      */}
      <div className="flex items-center gap-2 w-full h-full">
         <img 
            src="https://cdn-icons-png.flaticon.com/512/2984/2984620.png" 
            alt="Sakhi Logo" 
            className="w-full h-full object-contain drop-shadow-sm"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('fallback-logo');
            }}
         />
      </div>
    </div>
  );
};