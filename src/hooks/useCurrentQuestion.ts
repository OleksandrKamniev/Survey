import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import surveyConfig from '@/data/surveyConfig.json';
import { QuestionItem } from '@/components/Main/Question/types';

export const useCurrentQuestion = (stepName: string) => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem | null>(
    null,
  );

  useEffect(() => {
    const question = surveyConfig.questions.find((q) => q.id === stepName);
    if (question) {
      setCurrentQuestion(question as QuestionItem);
    } else {
      router.push('/');
    }
  }, [stepName, router]);

  const isInformScreen = currentQuestion?.screenType === 'inform';

  return { currentQuestion, isInformScreen };
};
