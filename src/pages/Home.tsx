"use client";

import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import Header from "@/components/Header/Header";

import surveyConfig from "@/data/surveyConfig.json";
import { store } from "@/store/store";
import { QuestionItem } from "@/components/Main/Question/types";
import Main from "@/components/Main/Main";

export default function HomePage() {
    const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
        surveyConfig.questions[0]?.id
    );
    const [history, setHistory] = useState<string[]>([]);

    const currentQuestion: QuestionItem= surveyConfig.questions.find(
        (q) => q.id === currentQuestionId
    ) as QuestionItem;

    const isInformScreen = currentQuestion?.screenType === "inform";

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--background",
            isInformScreen
                ? "linear-gradient(to bottom, #4A3D8D, #6939A1)"
                : "#FFF0F0"
        );
    }, [isInformScreen]);

    const handleNextQuestion = (nextId: string | null) => {
        setHistory((prev) => [...prev, currentQuestionId!]);
        setCurrentQuestionId(nextId);
    };

    const handleBackPage = () => {
        if (history.length) {
            const previousQuestionId = history[history.length - 1];
            setHistory((prev) => prev.slice(0, -1));
            setCurrentQuestionId(previousQuestionId);
        }
    };

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
                />
            </div>
        </Provider>
    );
}
