import { useState, useEffect } from 'react';

export const useAnswers = () => {
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    JSON.parse(sessionStorage.getItem('answers') || '{}'),
  );

  useEffect(() => {
    sessionStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  const addAnswer = (questionId: string, answer: string) =>
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

  return {
    answers,
    addAnswer,
  };
};
