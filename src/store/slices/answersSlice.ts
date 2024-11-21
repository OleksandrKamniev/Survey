import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AnswerEntry = {
  questionName: string;
  answer: string;
  answerName: string;
  type: string;
};

type AnswersState = {
  [id: string]: AnswerEntry;
};

const initialState: AnswersState = {};

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    setAnswer: (
      state,
      action: PayloadAction<{
        id: string;
        answer: string;
        questionName: string;
        answerName: string;
        type: string;
      }>,
    ) => {
      const { id, answer, questionName, answerName, type } = action.payload;

      state[id] = { questionName, answer, type, answerName };
    },
    resetAnswers: () => initialState,
  },
});

export const { setAnswer } = answersSlice.actions;
export default answersSlice.reducer;
