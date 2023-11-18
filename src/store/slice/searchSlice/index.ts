import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loader } from '../../../API/loaders';
import { getUrlParam } from '../../../commons/utils';

export const fetchData = createAsyncThunk('search/fethData', async function () {
  return await loader('a', '1');
});

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: getUrlParam('q'),
    status: null,
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.searchQuery = action.payload.text;
    },
  },
  // extraReducers: {
  //   [fetchData.pending]: (state, action) => {
  //     state.status = 'loading';
  //     state.error = null;
  //   },
  //   [fetchData.fulfilled]: (state, action) => {},
  //   [fetchData.rejected]: (state, action) => {},
  // },
});

export const { setQuery } = searchSlice.actions;

export default searchSlice.reducer;
