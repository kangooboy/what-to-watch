import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, FilmStatus } from '../const';
import { AppDispatch } from '../types/state.js';
import { Film } from '../types/film';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Review, ReviewData } from '../types/review';
import { FilmFavoriteStatus } from '../types/film-favorite-status';
import { loadFavoriteFilmAction, removeFavoriteFilmAction } from './film-data/film-data';

export const fetchFilmsAction = createAsyncThunk<Film[], undefined, {
  extra: AxiosInstance
}>(
  'fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    return data;
  },
);

export const fetchFilmAction = createAsyncThunk<Film | undefined, string, {
  extra: AxiosInstance
}>(
  'fetchFilm',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      return data;
    }catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  extra: AxiosInstance
}>(
  'fetchReviews',
  async (id, {extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
    return data;
  },
);

export const sendReviewAction = createAsyncThunk<Review[], ReviewData, {
  extra: AxiosInstance
}>(
  'sendReview',
  async ({rating, comment, id}, {extra: api}) => {
    const {data} = await api.post<Review[]>(`${APIRoute.Reviews}/${id}`, {rating, comment});
    return data;
  },
);

export const fetchPromoFilmAction = createAsyncThunk<Film | undefined, undefined, {
  extra: AxiosInstance
}>(
  'fetchPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film | undefined>(APIRoute.PromoFilm);
    return data;
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<Film[], undefined, {
  extra: AxiosInstance
}>(
  'fetchFavoriteFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.FavoriteFilms);
    return data;
  },
);

export const changeFilmFavoriteStatus = createAsyncThunk<void, FilmFavoriteStatus, {
  dispatch: AppDispatch,
  extra: AxiosInstance
}>(
  'changeFilmFavoriteStatus',
  async ({id, status}, {dispatch, extra: api}) => {
    const {data} = await api.post<Film>(`${APIRoute.FavoriteFilms}/${id}/${status}`);
    if(status === FilmStatus.Favorite) {
      dispatch(loadFavoriteFilmAction(data));
    }else {
      dispatch(removeFavoriteFilmAction(data));
    }
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<Film[], string, {
  extra: AxiosInstance
}>(
  'fetchSimilarFilmsAction',
  async (id, {extra: api}) => {
    const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance
}>(
  'checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  extra: AxiosInstance
}>(
  'login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  extra: AxiosInstance
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Login));
  },
);
