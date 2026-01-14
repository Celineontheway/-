import React, { useState } from 'react';
import { AppState, WisdomData } from './types';
import { fetchMaoWisdom } from './services/geminiService';
import { FALLBACK_WISDOM, ANIMATION_DELAY_MS } from './constants';
import BookCover from './components/BookCover';
import LoadingState from './components/LoadingState';
import AnswerCard from './components/AnswerCard';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [wisdom, setWisdom] = useState<WisdomData | null>(null);

  const handleFetchWisdom = async () => {
    setAppState(AppState.LOADING);
    
    try {
      // Start the API call (no input needed)
      const fetchPromise = fetchMaoWisdom();
      
      // Enforce a minimum animation duration for user experience
      const delayPromise = new Promise(resolve => setTimeout(resolve, ANIMATION_DELAY_MS));
      
      const [data] = await Promise.all([fetchPromise, delayPromise]);
      
      setWisdom(data);
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error("Failed to fetch wisdom, using fallback.", error);
      setWisdom(FALLBACK_WISDOM);
      // Still wait for animation if error happened instantly
      setTimeout(() => setAppState(AppState.RESULT), 1000);
    }
  };

  const handleReset = () => {
    setWisdom(null);
    setAppState(AppState.LANDING);
  };

  // Dynamic background style based on state
  const getBackgroundClass = () => {
    switch (appState) {
      case AppState.RESULT:
        return "bg-red-900"; // Darker for the card to pop
      default:
        return "bg-gradient-to-b from-red-900 to-red-950";
    }
  };

  return (
    <div className={`min-h-screen w-full ${getBackgroundClass()} text-amber-50 overflow-x-hidden transition-colors duration-700 relative`}>
      {/* Global Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      
      <main className="relative z-10 w-full h-full min-h-screen flex flex-col">
        {appState === AppState.LANDING && (
          <BookCover onOpen={handleFetchWisdom} />
        )}

        {/* Note: INPUT state is skipped as user contemplates internally */}

        {appState === AppState.LOADING && (
          <div className="flex-1 flex items-center justify-center">
            <LoadingState />
          </div>
        )}

        {appState === AppState.RESULT && wisdom && (
          <AnswerCard data={wisdom} onReset={handleReset} />
        )}
      </main>
      
      {/* Footer / Copyright */}
      <footer className="fixed bottom-2 w-full text-center pointer-events-none z-0">
        <p className="text-[10px] text-white/10 font-mono">MAO'S WISDOM - POWERED BY GEMINI</p>
      </footer>
    </div>
  );
};

export default App;