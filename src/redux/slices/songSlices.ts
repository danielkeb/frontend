// src/redux/slices/songSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface VisualizationData {
  songCount: number;
  artistCount: number;
  genreCount: number;
  albumCount: number;
}

interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  visualizationData: VisualizationData | null;
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
  visualizationData: null,
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsRequest(state) {
      state.loading = true;
    },
    createSongRequest(state, action: PayloadAction<Song>) {
      state.loading = true;
    },
    updateSongRequest(state, action: PayloadAction<Song>) {
      state.loading = true;
    },
    deleteSongRequest(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
    },
    createSongSuccess(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
      state.loading = false;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.songs.findIndex(song => song._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.loading = false;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter(song => song._id !== action.payload);
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    createSongFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    calculateVisualizationData(state) {
      const artistCount = new Set(state.songs.map(song => song.artist)).size;
      const genreCount = new Set(state.songs.map(song => song.genre)).size;
      const albumCount = new Set(state.songs.map(song => song.album)).size;

      state.visualizationData = {
        songCount: state.songs.length,
        artistCount,
        genreCount,
        albumCount,
      };
    },
  },
});

export const {
  fetchSongsRequest,
  createSongRequest,
  updateSongRequest,
  deleteSongRequest,
  fetchSongsSuccess,
  createSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
  fetchSongsFailure,
  createSongFailure,
  updateSongFailure,
  deleteSongFailure,
  calculateVisualizationData,
} = songSlice.actions;

export default songSlice.reducer;
