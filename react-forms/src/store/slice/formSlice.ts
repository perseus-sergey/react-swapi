import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'formSlice',
  initialState: {
    formData: {
      age: 0,
      email: '',
      gender: '',
      name: '',
      password: '',
      passwordConfirm: '',
      tc: false,
    },
    status: null,
    error: null,
  },
  reducers: {
    setFormValues(state, action) {
      state.formData = action.payload.formData;
    },
  },
});

export const { setFormValues } = formSlice.actions;

export default formSlice.reducer;
