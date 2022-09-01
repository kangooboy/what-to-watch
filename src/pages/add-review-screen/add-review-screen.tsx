import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction } from '../../store/api-action';
import { getFilm } from '../../store/film-data/selectors';
import { AppRoute } from '../../const';
import ReviewForm from '../../components/review-form/review-form';
import UserMenu from '../../components/user-menu/user-menu';

function AddReviewScreen() {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const film = useAppSelector(getFilm);

  useEffect(() => {
    if(id) {
      dispatch(fetchFilmAction(id));
    }
  }, [id, dispatch]);


  if(!film) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.previewImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.Root} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}/review`}className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
          <UserMenu />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={`${film.name} 'poster'`} width="218" height="327" />
        </div>
      </div>

      <ReviewForm />

    </section>
  );
}

export default AddReviewScreen;
