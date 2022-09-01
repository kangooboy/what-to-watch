import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFavoriteFilmsAction, changeFilmFavoriteStatus } from '../../store/api-action';
import { getFavoriteFilms, getIsFavoriteFilmsLoad } from '../../store/film-data/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Film } from '../../types/film';
import { FilmStatus, AuthorizationStatus,AppRoute } from '../../const';

type Props = {
  film: Film;
}

function AddMylistButton({film}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavoriteFilmsLoading = useAppSelector(getIsFavoriteFilmsLoad);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const isFilmFavorite = favoriteFilms.some((item) => item.id === film.id);

  useEffect(() => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [dispatch, authorizationStatus]);

  const handlerAddToFavoriteButtonClick = () => {
    if(authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(changeFilmFavoriteStatus(
        {
          id: film.id,
          status: isFilmFavorite ? FilmStatus.Common : FilmStatus.Favorite
        }
      ));
    }else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button onClick={handlerAddToFavoriteButtonClick} disabled={isFavoriteFilmsLoading}
      className="btn btn--list film-card__button" type="button"
    >
      {isFilmFavorite &&
        <svg viewBox="0 0 18 14" width="19" height="20">
          <use xlinkHref="#in-list" />
        </svg>}
      {!isFilmFavorite &&
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add" />
        </svg>}
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
}

export default AddMylistButton;
