import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import searchReducer from './slice/cardFilter';

const store = configureStore({
  reducer: {
    searchReducer,
  },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
