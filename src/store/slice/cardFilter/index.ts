import { createSlice } from '@reduxjs/toolkit';
import { getUrlParam } from '../../../commons/utils';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: getUrlParam('q'),
  },
  reducers: {
    setQuery(state, action) {
      state.searchQuery = action.payload.text;
    },
  },
});

export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;
