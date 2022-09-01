import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Film } from '../../types/film';

export const getGenre = (state: State): string => state[NameSpace.Film].genre;
export const getIsFilmLoad = (state: State): boolean => state[NameSpace.Film].isFilmLoad;
export const getShowingFilmCount = (state: State): number => state[NameSpace.Film].showingFilmCount;
export const getFilteredFilms = (state: State): Film[] => state[NameSpace.Film].filteredFilms;
export const getFilms = (state: State): Film[] => state[NameSpace.Film].films;
