import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Summary = () => {
  const answers = useSelector((state: RootState) => state.answers);
  console.log('stateAnswers');
  console.log(answers);
  useEffect(() => {
    sessionStorage.removeItem('history');
    sessionStorage.removeItem('answers');
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Survey Summary</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(answers)
          .filter(([, { type }]) => type === 'choice')
          .map(([id, { questionName, answerName }]) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
            >
              <h2 className="font-semibold text-lg mb-2">{questionName}</h2>
              <p className="text-gray-700 font-medium">Your Answer:</p>
              <p className="text-blue-500">{answerName}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Summary;
