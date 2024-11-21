import { configureStore } from '@reduxjs/toolkit';
import answersSlice from './slices/answersSlice';

export const store = configureStore({
    reducer: {
        answers: answersSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;