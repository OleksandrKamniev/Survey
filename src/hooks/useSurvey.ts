import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import surveyConfig from '@/data/surveyConfig.json';
import { QuestionItem } from '@/components/Main/Question/types';

export const useSurvey = () => {
  const params = useParams();
  const router = useRouter();
  const stepName = params?.stepName as string;

  const [history, setHistory] = useState<string[]>(() =>
    JSON.parse(sessionStorage.getItem('history') || '[]'),
  );
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    JSON.parse(sessionStorage.getItem('answers') || '{}'),
  );
  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem | null>(
    null,
  );

  useEffect(() => {
    sessionStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    sessionStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    const question = surveyConfig.questions.find((q) => q.id === stepName);
    if (question) {
      setCurrentQuestion(question as QuestionItem);
    } else {
      router.push('/');
    }
  }, [stepName, router]);

  const handleNextQuestion = (nextId: string | null, answer?: string) => {
    if (!nextId) {
      sessionStorage.removeItem('history');
      sessionStorage.removeItem('answers');
      router.push('/submit');
      return;
    }

    if (answer && currentQuestion) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
    }

    setHistory((prev) => [...prev, stepName]);
    router.push(`/${nextId}`);
  };

  const handleBackPage = () => {
    if (history.length > 0) {
      const previousQuestionId = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      router.push(`/${previousQuestionId}`);
    }
  };

  const isInformScreen = currentQuestion?.screenType === 'inform';

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--background',
      isInformScreen
        ? 'linear-gradient(to bottom, #4A3D8D, #6939A1)'
        : '#FFF0F0',
    );
  }, [isInformScreen]);

  return {
    history,
    setHistory,
    answers,
    setAnswers,
    currentQuestion,
    stepName,
    router,
    handleNextQuestion,
    handleBackPage,
    isInformScreen,
  };
};
