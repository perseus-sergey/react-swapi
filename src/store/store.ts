import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { swApi } from './planetApi';
// import searchReducer from './slice/searchSlice';
// import pageNumberReducer from './slice/pageSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      [swApi.reducerPath]: swApi.reducer,
      // searchReducer,
      // pageNumberReducer,
    },
    middleware: (gDM) => gDM().concat(swApi.middleware),
  });

export type RootState = ReturnType<AppStore['getState']>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
