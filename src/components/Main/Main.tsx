import React from 'react';
import Question from '@/components/Main/Question/Question';
import Summary from '@/components/Main/Summary/Summary';
import { MainProps } from '@/components/Main/types';

const Main: React.FC<MainProps> = ({
  isInformScreen,
  currentQuestion,
  handleNextQuestion,
  answers,
}) => {
  return (
    <main
      className={`flex flex-col items-center justify-between mx-[15px] ${
        isInformScreen ? 'h-screen text-white' : 'text-dark-grey'
      }`}
    >
      {currentQuestion?.screenType === 'choice' || isInformScreen ? (
        <Question
          question={currentQuestion}
          onNext={handleNextQuestion}
          isInformScreen={isInformScreen}
          storageAnswers={answers}
        />
      ) : (
        <Summary />
      )}
    </main>
  );
};

export default Main;
