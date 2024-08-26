// src/redux/sagas/songSagas.ts
import { call, put, takeLatest, AllEffect, CallEffect, PutEffect, TakeEffect, Effect } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from '../slices/songSlices';
import { PayloadAction } from '@reduxjs/toolkit';
interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
  
  }




// Define the return type for all saga functions
type SagaResult<T> = Generator<CallEffect<T> | PutEffect<any> | Effect, void, any>;


// Saga function to fetch songs
function* fetchSongs(): SagaResult<any> {
  try {
    const response = yield call(axios.get, 'http://localhost:5000/api/songs/');
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error instanceof AxiosError ? error.message : 'An unknown error occurred'));
  }
}

// Saga function to create a song
function* createSong(action: PayloadAction<Song>): SagaResult<any> {
  try {
    const response = yield call(axios.post, 'http://localhost:5000/api/songs', action.payload);
    yield put(createSongSuccess(response.data));

  } catch (error) {
    yield put(createSongFailure(error instanceof AxiosError ? error.message : 'An unknown error occurred'));
  }
}

// Saga function to update a song
function* updateSong(action: PayloadAction<Song>): SagaResult<any> {
  try {
    const response = yield call(axios.put, `http://localhost:5000/api/songs/${action.payload._id}`, action.payload);
    yield put(updateSongSuccess(response.data));

  } catch (error) {
    yield put(updateSongFailure(error instanceof AxiosError ? error.message : 'An unknown error occurred'));
  }
}

// Saga function to delete a song
function* deleteSong(action: PayloadAction<string>): SagaResult<any> {
  try {
    yield call(axios.delete, `http://localhost:5000/api/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));

  } catch (error) {
    yield put(deleteSongFailure(error instanceof AxiosError ? error.message : 'An unknown error occurred'));
  }
}

// Root saga that watches for actions
function* songSagas(): SagaResult<any> {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
  yield takeLatest(createSongRequest.type, createSong);
  yield takeLatest(updateSongRequest.type, updateSong);
  yield takeLatest(deleteSongRequest.type, deleteSong);
}

export default songSagas;
