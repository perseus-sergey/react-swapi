import { createSlice } from '@reduxjs/toolkit';

export const pageNumberSlice = createSlice({
  name: 'pageSlice',
  initialState: {
    pageNumber: 1,
    status: null,
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.pageNumber = action.payload.pageNumber;
    },
  },
});

export const { setQuery } = pageNumberSlice.actions;

export default pageNumberSlice.reducer;
