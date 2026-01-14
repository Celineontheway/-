import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-fade-in">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Rotating Rays */}
        <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
           {[...Array(12)].map((_, i) => (
             <div
               key={i}
               className="absolute top-1/2 left-1/2 w-full h-1 bg-gold-base/20 origin-center -translate-y-1/2"
               style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}
             ></div>
           ))}
        </div>
        
        {/* Pulsing Star */}
        <svg 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-24 h-24 text-gold-base drop-shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-pulse"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>
      
      <div className="text-gold-light text-xl font-serif tracking-widest text-center space-y-2">
        <p className="animate-pulse">正在翻阅卷宗...</p>
        <p className="text-sm opacity-70">Searching Archives</p>
      </div>
    </div>
  );
};

export default LoadingState;