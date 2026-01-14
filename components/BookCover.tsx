import React from 'react';
import { Book } from 'lucide-react';

interface BookCoverProps {
  onOpen: () => void;
}

const BookCover: React.FC<BookCoverProps> = ({ onOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-4">
      <div 
        onClick={onOpen}
        className="group relative w-full max-w-sm aspect-[3/4] bg-red-base rounded-r-2xl rounded-l-sm shadow-2xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-red-900/50 border-l-8 border-red-dark flex flex-col items-center text-center justify-between py-16 px-8 overflow-hidden"
      >
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leather.png')]"></div>

        {/* Top Text */}
        <div className="z-10 flex flex-col items-center space-y-4">
           <div className="w-16 h-1 bg-gold-base opacity-80"></div>
           <h1 className="text-6xl font-display text-gold-base drop-shadow-md tracking-widest writing-vertical-rl">
             毛选
           </h1>
           <h2 className="text-3xl font-serif text-gold-light tracking-[0.5em] mt-4">
             答案之书
           </h2>
        </div>

        {/* Center Icon */}
        <div className="z-10 my-8 p-4 border-2 border-gold-base/30 rounded-full animate-pulse">
          <Book className="w-12 h-12 text-gold-base opacity-90" />
        </div>

        {/* Bottom Text */}
        <div className="z-10 space-y-2">
           <p className="text-gold-light/90 text-base tracking-widest font-serif border-b border-gold-light/20 pb-2 mb-2">
             心中默念你的困惑
           </p>
           <p className="text-gold-light/60 text-xs tracking-wider">
             无需多言 · 此刻翻阅 · 即见真章
           </p>
        </div>
        
        {/* CTA Hint */}
        <div className="absolute bottom-6 text-gold-base text-sm animate-bounce font-bold">
          点击获取指引
        </div>
      </div>
      
      <p className="mt-8 text-gold-light/50 text-sm font-serif">
        Selected Works of Mao Zedong
      </p>
    </div>
  );
};

export default BookCover;