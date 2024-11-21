export interface Option {
  key: string;
  label: string;
}
interface DynamicNextAnswer {
  [key: string]: string;
}

interface DynamicNext {
  id: string;
  answers: DynamicNextAnswer[];
}
interface AnswerMapping {
  [key: string]: string;
}

interface DynamicName {
  id: string;
  answers: AnswerMapping[];
}
export interface QuestionItem {
  id: string;
  screenType: string;
  name: string;
  caption?: string;
  options?: Option[];
  dynamicNames?: DynamicName[];
  dynamicNext?: DynamicNext;
  next?: Record<string, string | undefined>;
}
export interface QuestionProps {
  question: QuestionItem;
  onNext: (nextId: string | null, answer?: string) => void;
  isInformScreen: boolean;
  storageAnswers: Record<string, string>;
}
