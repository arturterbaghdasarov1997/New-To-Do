import { createSlice } from '@reduxjs/toolkit';

const initialState = 'en';

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage: (state) => (state === 'en' ? 'ge' : 'en'),
  },
});

export const { toggleLanguage } = languageSlice.actions;

export default languageSlice.reducer;