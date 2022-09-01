import { createSlice } from '@reduxjs/toolkit';
import { fetchFilmAction, fetchPromoFilmAction, fetchFavoriteFilmsAction, changeFilmFavoriteStatus, fetchReviewsAction, fetchSimilarFilmsAction} from '../api-action';
import { NameSpace } from '../../const';
import { Film } from '../../types/film';
import { Review } from '../../types/review';

type InitialState = {
  film?: Film | undefined;
  isFilmLoading: boolean;
  promoFilm: Film | undefined;
  favoriteFilms: Film[];
  isFavoriteFilmsLoading: boolean;
  similarFilms: Film[];
  reviews: Review[];
}

const initialState: InitialState = {
  film: undefined,
  isFilmLoading: false,
  promoFilm: undefined,
  favoriteFilms: [],
  isFavoriteFilmsLoading: false,
  similarFilms: [],
  reviews: [],
};

export const filmData = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    loadFavoriteFilmAction: (state, action) => {
      state.favoriteFilms = [...state.favoriteFilms, action.payload];
    },
    removeFavoriteFilmAction: (state, action) => {
      state.favoriteFilms = state.favoriteFilms.filter((item) => item.id !== action.payload.id);
    },
    setFavoriteFilmsAction: (state, action) => {
      state.favoriteFilms = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state, action) => {
        state.isFilmLoading = true;
        state.film = action.payload;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.isFilmLoading = false;
        state.film = action.payload;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(changeFilmFavoriteStatus.pending, (state) => {
        state.isFavoriteFilmsLoading = true;
      })
      .addCase(changeFilmFavoriteStatus.fulfilled, (state) => {
        state.isFavoriteFilmsLoading = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      });
  }
});

export const {loadFavoriteFilmAction, setFavoriteFilmsAction, removeFavoriteFilmAction} = filmData.actions;
