import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Film } from '../../types/film';
import { Review } from '../../types/review';

export const getFilm = (state: State): Film | undefined => state[NameSpace.Data].film;
export const getIsFavoriteFilmsLoad = (state: State): boolean => state[NameSpace.Data].isFavoriteFilmsLoading;
export const getPromoFilm = (state: State): Film | undefined => state[NameSpace.Data].promoFilm;
export const getSimilarFilms = (state: State): Film[] => state[NameSpace.Data].similarFilms;
export const getFavoriteFilms = (state: State): Film[] => state[NameSpace.Data].favoriteFilms;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getIsFilmLoading = (state: State): boolean => state[NameSpace.Data].isFilmLoading;
