import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import themeReducer from '../features/theme/themeSlice';
import languageReducer from '../features/language/languageSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});