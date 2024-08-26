// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songReducer from './slices/songSlices';
import songSagas from './sagas/songSagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(songSagas);

// Define RootState
export type RootState = ReturnType<typeof store.getState>;

export default store;
