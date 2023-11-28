import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'formSlice',
  initialState: {
    searchQuery: '',
    status: null,
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.searchQuery = action.payload.text;
    },
  },
});

export const { setQuery } = formSlice.actions;

export default formSlice.reducer;
