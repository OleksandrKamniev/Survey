import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer } from "@/store/slices/answersSlice";
import { QuestionProps } from "@/components/Main/Question/types";
import { RootState } from "@/store/store";

const Question = ({ question, onNext, isInformScreen }: QuestionProps) => {
    const dispatch = useDispatch();
    const answers = useSelector((state: RootState) => state.answers);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);


    const renderDynamicName = () => {
        if (!question.dynamicNames) return question.name;
        let updatedName = question.name;

        question.dynamicNames.forEach((dynamic) => {
            const prevAnswer = answers[dynamic.id]?.answer;

            if (prevAnswer) {
                const replacement = dynamic.answers.find((item) => Object.hasOwn(item, prevAnswer))?.[prevAnswer];

                if (replacement) {
                    updatedName = updatedName.replace(dynamic.id, replacement);
                }
            }
        });

        return updatedName;
    };


    const handleAnswer = (object: { answer: string; questionName: string; answerLabel: string }) => {
        const { answer, questionName, answerLabel } = object;

        setSelectedOption(answer);
        dispatch(
            setAnswer({
                id: question.id,
                type: question.screenType,
                answer,
                questionName,
                answerName: answerLabel,
            })
        );

        if (question.dynamicNext) {
            const dependentAnswer = answers[question.dynamicNext.id]?.answer;

            if (dependentAnswer) {
                const nextMapping = question.dynamicNext.answers.find(
                    (mapping) => Object.hasOwn(mapping, dependentAnswer)
                );

                if (nextMapping) {
                    const nextId = nextMapping[dependentAnswer];
                    console.log(`Next ID found: ${nextId}`);
                    onNext(nextId);
                } else {
                    console.warn(`No dynamicNext mapping found for answer: ${dependentAnswer}`);
                    onNext(null);
                }
            } else {
                console.warn("Dependent answer is undefined. Check if the previous question has been answered.");
                onNext(null);
            }
        } else {
            onNext(question.next?.[answer] || null);
        }
    };


    const dynamicName = renderDynamicName();
    return (
        <div>
            <div className={`mb-[20px] ${isInformScreen ? "text-white text-center" : ""}`}>
                <h1 className={`font-bold text-xl leading-7 mb-[30px] ${isInformScreen ? "text-white"  : "text-dark-grey"}`}>
                    {dynamicName}
                </h1>
                <p>{question.caption}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
            {question.options?.map((option) => (
                <button
                    key={option.key}
                    onClick={() =>
                        handleAnswer({
                            answer: option.key,
                            questionName: dynamicName,
                            answerLabel: option.label,
                        })
                    }
                    className={`w-[330px] h-[64px] flex items-center justify-center px-[6px] ${
                        selectedOption === option.key
                            ? "bg-gradient-to-b from-[#141333] via-[#202261] via-[#543C97] to-[#6939A1] text-white"
                            : "bg-light-blue text-black"
                    }
                      ${isInformScreen ? "text-dark-purple" : ""}
                      border border-[#E0E0E0] py-[22px] rounded-[16px] shadow-[4px_4px_8px_rgba(0,0,0,0.25)] mb-[25px]`}
                >
                    {option.label}
                </button>
            ))}
            </div>
        </div>
    );
};

export default Question;
