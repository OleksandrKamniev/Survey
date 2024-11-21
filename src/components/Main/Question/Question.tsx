import { useState } from 'react';
import { QuestionProps } from '@/components/Main/Question/types';
import { useDispatch } from 'react-redux';
import { setAnswer } from '@/store/slices/answersSlice';

const Question = ({
  question,
  onNext,
  isInformScreen,
  storageAnswers,
}: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    storageAnswers[question.id] || null,
  );
  const dispatch = useDispatch();

  const renderDynamicName = () =>
    question.dynamicNames
      ? question.dynamicNames.reduce((name, dynamic) => {
          const prevAnswer = storageAnswers[dynamic.id];
          if (!prevAnswer) return name;

          const replacement = dynamic.answers.find((item) =>
            Object.hasOwn(item, prevAnswer),
          )?.[prevAnswer];

          return replacement ? name.replace(dynamic.id, replacement) : name;
        }, question.name)
      : question.name;

  const resolveNextId = (answer: string) => {
    let nextId = question.next?.[answer] || null;

    if (question.dynamicNext) {
      const dependentAnswer = storageAnswers[question.dynamicNext.id];
      if (dependentAnswer) {
        const dynamicMapping = question.dynamicNext.answers.find(
          (mapping) => mapping[dependentAnswer],
        );
        if (dynamicMapping) {
          nextId = dynamicMapping[dependentAnswer];
        }
      }
    }

    return nextId;
  };

  const getButtonClass = (key: string) =>
    selectedOption === key
      ? 'bg-gradient-to-b from-[#141333] via-[#202261] via-[#543C97] to-[#6939A1] text-white'
      : 'bg-light-blue text-black';

  const handleAnswer = (answer: string, answerName: string) => {
    setSelectedOption(answer);

    const updatedAnswers = { ...storageAnswers, [question.id]: answer };
    sessionStorage.setItem('answers', JSON.stringify(updatedAnswers));

    const nextId = resolveNextId(answer);

    onNext(nextId, answer);

    dispatch(
      setAnswer({
        id: question.id,
        type: question.screenType,
        answer,
        questionName: renderDynamicName(),
        answerName,
      }),
    );
  };

  return (
    <div>
      <div
        className={`mb-[20px] ${isInformScreen ? 'text-white text-center' : ''}`}
      >
        <h1
          className={`font-bold text-xl leading-7 mb-[30px] ${
            isInformScreen ? 'text-white' : 'text-dark-grey'
          }`}
        >
          {renderDynamicName()}
        </h1>
        <p>{question.caption}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        {question.options?.map((option) => (
          <button
            key={option.key}
            onClick={() => handleAnswer(option.key, option.label)}
            className={`w-[330px] h-[64px] flex items-center justify-center px-[6px] ${getButtonClass(
              option.key,
            )} border border-[#E0E0E0] py-[22px] rounded-[16px] shadow-[4px_4px_8px_rgba(0,0,0,0.25)] mb-[25px]`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
