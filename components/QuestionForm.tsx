import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface QuestionFormProps {
  onSubmit: (question: string) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto px-6 animate-fade-in-up">
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-3xl font-display text-gold-base">心中的困惑</h2>
        <p className="text-gold-light/70 font-serif text-sm leading-relaxed">
          无论是生活、工作还是理想，<br/>
          请写下你此刻面临的问题或处境。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6 relative">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例如：在这个复杂的局势下，我该如何破局？"
            className="w-full h-40 bg-paper/10 border-2 border-gold-base/30 rounded-lg p-6 text-gold-light placeholder-gold-light/30 focus:outline-none focus:border-gold-base focus:bg-paper/15 transition-all resize-none font-serif text-lg"
            maxLength={150}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gold-light/40">
            {input.length}/150
          </div>
        </div>

        <button
          type="submit"
          disabled={!input.trim()}
          className="w-full py-4 bg-gold-base hover:bg-amber-400 text-red-900 font-bold text-lg rounded-lg shadow-lg transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
        >
          <span>寻求指引</span>
          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
      
      <div className="mt-12 border-t border-gold-light/10 w-full pt-6 text-center">
        <p className="text-gold-light/30 text-xs">
          * 唯物辩证法将为你提供战略视角
        </p>
      </div>
    </div>
  );
};

export default QuestionForm;