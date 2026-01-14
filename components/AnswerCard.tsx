import React, { useRef, useState } from 'react';
import { WisdomData } from '../types';
import { RefreshCw, Download, Quote, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';

interface AnswerCardProps {
  data: WisdomData;
  onReset: () => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ data, onReset }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!cardRef.current || isSaving) return;

    setIsSaving(true);
    try {
      // Generate image from the DOM element
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        pixelRatio: 2, // Higher resolution
        backgroundColor: '#FDFBF7', // Ensure the paper color is captured
      });

      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.download = `mao-wisdom-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to generate image:', err);
      alert('图片生成失败，请尝试直接截图保存。');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-8 px-4 animate-fade-in">
      
      {/* Card Container */}
      <div 
        ref={cardRef}
        className="relative w-full max-w-lg bg-paper rounded-lg shadow-2xl overflow-hidden"
      >
        {/* Header Strip */}
        <div className="h-2 bg-red-base w-full"></div>
        
        <div className="p-8 md:p-10 flex flex-col items-center">
          {/* Decorative Top */}
          <div className="mb-6 text-red-dark/20">
             <Quote size={48} />
          </div>

          {/* Main Quote */}
          <h3 className="text-2xl md:text-3xl font-display text-red-dark text-center leading-relaxed tracking-wide mb-6 relative z-10">
            “{data.quote}”
          </h3>

          {/* Divider */}
          <div className="w-16 h-1 bg-red-dark/10 mb-6"></div>

          {/* Source */}
          <p className="text-sm md:text-base font-serif text-gray-600 italic mb-8">
             —— {data.source}
          </p>

          {/* Interpretation Box */}
          <div className="bg-red-50/50 border border-red-100 rounded-lg p-5 w-full mb-6">
            <h4 className="text-xs font-bold text-red-800 uppercase tracking-widest mb-2 opacity-60">
              战略启示
            </h4>
            <p className="text-gray-800 font-serif leading-7 text-justify">
              {data.interpretation}
            </p>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 justify-center">
            {data.keywords.map((keyword, idx) => (
              <span key={idx} className="px-3 py-1 bg-red-dark text-gold-light text-xs rounded-full font-serif tracking-wider">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-paper-texture opacity-40 mix-blend-multiply"></div>
        
        {/* Stamp Effect */}
        <div className="absolute top-6 right-6 w-24 h-24 border-4 border-red-800/20 rounded-full flex items-center justify-center rotate-12 pointer-events-none opacity-30">
          <div className="w-20 h-20 border border-red-800/20 rounded-full flex items-center justify-center text-xs text-red-800/40 font-display">
             星星之火
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex space-x-4">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-transparent border border-gold-base text-gold-base hover:bg-gold-base/10 rounded-full flex items-center space-x-2 transition-all"
        >
          <RefreshCw size={18} />
          <span>再次求索</span>
        </button>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-red-dark text-gold-base rounded-full shadow-lg hover:bg-red-950 transition-all flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
          <span>{isSaving ? '生成中...' : '留存'}</span>
        </button>
      </div>
    </div>
  );
};

export default AnswerCard;