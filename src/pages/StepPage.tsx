'use client';

import Header from '@/components/Header/Header';
import Main from '@/components/Main/Main';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useSurvey } from '@/hooks/useSurvey';

export default function StepPage() {
  const {
    history,
    answers,
    currentQuestion,
    handleNextQuestion,
    handleBackPage,
    isInformScreen,
  } = useSurvey();

  if (!currentQuestion) return null;

  return (
    <Provider store={store}>
      <div>
        <Header
          isInformScreen={isInformScreen}
          history={history}
          handleBackPage={handleBackPage}
        />
        <Main
          isInformScreen={isInformScreen}
          currentQuestion={currentQuestion}
          handleNextQuestion={handleNextQuestion}
          answers={answers}
        />
      </div>
    </Provider>
  );
}
