import { QuestionItem } from '@/components/Main/Question/types';

export interface MainProps {
  isInformScreen: boolean;
  currentQuestion: QuestionItem;
  handleNextQuestion: (nextId: string | null) => void;
  answers: Record<string, string>;
}
