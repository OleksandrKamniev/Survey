import Question from "@/components/Main/Question/Question";
import Summary from "@/components/Main/Summary/Summary";

import { MainProps } from "@/components/Main/types";

const Main = ({
                  isInformScreen,
                  currentQuestion,
                  handleNextQuestion,
              }: MainProps) => {
    return (
        <main
            className={`flex flex-col items-center justify-between mx-[15px] ${
                isInformScreen ? "h-screen text-white" : "text-dark-grey"
            }`}
        >
            {currentQuestion?.screenType === "choice" || isInformScreen ? (
                <Question
                    question={currentQuestion}
                    onNext={handleNextQuestion}
                    isInformScreen={isInformScreen}
                />
            ) : (
                <Summary />
            )}
        </main>
    );
};

export default Main;
