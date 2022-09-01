import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchFilmsAction, fetchPromoFilmAction } from '../../store/api-action';
import FilmList from '../../components/film-list/film-list';
import { AppRoute, SHOW_MORE_BEGIN_COUNT, SHOW_MORE_NEXT_COUNT } from '../../const';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import ShowMore from '../../components/show-more/show-more';
import PlayButton from '../../components/play-button/play-button';
import AddMylistButton from '../../components/add-mylist-button/add-mylist-button';
import PreLoader from '../../components/pre-loader/pre-loader';
import UserMenu from '../../components/user-menu/user-menu';
import { getPromoFilm } from '../../store/film-data/selectors';
import { getFilteredFilms, getShowingFilmCount } from '../../store/film-process/selectors';
import { resetShowMoreCount } from '../../store/film-process/film-process';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetShowMoreCount());
  }, [location, dispatch]);

  useEffect(() => {
    dispatch(fetchFilmsAction());
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);

  const promoFilm = useAppSelector(getPromoFilm);
  const filteredFilms = useAppSelector(getFilteredFilms);
  const showingFilmCount = useAppSelector(getShowingFilmCount);
  const showMoreFilms = useAppSelector(getFilteredFilms).slice(SHOW_MORE_BEGIN_COUNT, showingFilmCount + SHOW_MORE_NEXT_COUNT);

  if (!filteredFilms || !promoFilm) {
    return (
      <PreLoader />
    );
  }

  const shouldRenderShowMoreButton = filteredFilms.length <= SHOW_MORE_NEXT_COUNT || filteredFilms.length <= showingFilmCount + SHOW_MORE_NEXT_COUNT;

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <Link to={AppRoute.Root} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <UserMenu />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={`${promoFilm.name }poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton film={promoFilm} />
                <AddMylistButton film={promoFilm} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          <FilmList films={showMoreFilms} />
          {shouldRenderShowMoreButton || <ShowMore />}
        </section>

        <Footer />

      </div>
    </>
  );
}

export default MainScreen;
