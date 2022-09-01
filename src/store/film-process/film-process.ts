import { createSlice } from '@reduxjs/toolkit';
import { fetchFilmsAction } from '../api-action';
import { DEFAULT_GENRE, SHOW_MORE_BEGIN_COUNT, SHOW_MORE_NEXT_COUNT, NameSpace } from '../../const';
import { Film } from '../../types/film';

type InitialState = {
  genre: string;
  showingFilmCount: number;
  filteredFilms: Film[];
  films: Film[];
  isFilmLoad: boolean
}

const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  showingFilmCount: SHOW_MORE_BEGIN_COUNT,
  filteredFilms: [],
  films: [],
  isFilmLoad: false
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    changeGenre: (state, action) => {
      const genre = action.payload;
      if(action.payload) {
        state.genre = genre;
        if(genre !== DEFAULT_GENRE) {
          state.filteredFilms = state.films.filter((item) => item.genre === genre);
        }else {
          state.filteredFilms = state.films;
        }
      }
    },
    incrementShowMoreCount: (state) => {
      state.showingFilmCount = state.showingFilmCount + SHOW_MORE_NEXT_COUNT;
    },
    resetShowMoreCount: (state) => {
      state.showingFilmCount = SHOW_MORE_BEGIN_COUNT;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmLoad = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.filteredFilms = action.payload;
        state.isFilmLoad = false;
      });
  }
});

export const {changeGenre, incrementShowMoreCount, resetShowMoreCount} = filmProcess.actions;
