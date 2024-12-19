import { useState, useEffect } from 'react';

export const useHistory = () => {
  const [history, setHistory] = useState<string[]>(() =>
    JSON.parse(sessionStorage.getItem('history') || '[]'),
  );

  useEffect(() => {
    sessionStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (step: string) => setHistory((prev) => [...prev, step]);
  const removeLastFromHistory = () => setHistory((prev) => prev.slice(0, -1));

  return {
    history,
    addToHistory,
    removeLastFromHistory,
  };
};
