import { useParams, useRouter } from 'next/navigation';
import { useHistory } from './useHistory';
import { useAnswers } from './useAnswers';
import { useCurrentQuestion } from './useCurrentQuestion';
import { useBackground } from './useBackground';

export const useSurvey = () => {
  const params = useParams();
  const router = useRouter();
  const stepName = params?.stepName as string;

  const { history, addToHistory, removeLastFromHistory } = useHistory();
  const { answers, addAnswer } = useAnswers();
  const { currentQuestion, isInformScreen } = useCurrentQuestion(stepName);

  useBackground(isInformScreen);

  const handleNextQuestion = (nextId: string | null, answer?: string) => {
    if (!nextId) {
      sessionStorage.removeItem('history');
      sessionStorage.removeItem('answers');
      router.push('/submit');
      return;
    }

    if (answer && currentQuestion) {
      addAnswer(currentQuestion.id, answer);
    }

    addToHistory(stepName);
    router.push(`/${nextId}`);
  };

  const handleBackPage = () => {
    if (history.length > 0) {
      const previousQuestionId = history[history.length - 1];
      removeLastFromHistory();
      router.push(`/${previousQuestionId}`);
    }
  };

  return {
    history,
    answers,
    currentQuestion,
    stepName,
    router,
    handleNextQuestion,
    handleBackPage,
    isInformScreen,
  };
};
