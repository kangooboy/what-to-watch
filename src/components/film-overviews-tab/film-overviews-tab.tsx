import { Film } from '../../types/film';
import { RatingLevel, RatingRange } from '../../const';

type Props = {
  film: Film;
}

const getRating = (rating: number) => {
  if(rating > RatingRange.Bad.from && rating < RatingRange.Bad.to) {
    return RatingLevel.Bad;
  }
  if(rating >= RatingRange.Normal.from && rating < RatingRange.Normal.to) {
    return RatingLevel.Normal;
  }
  if(rating >= RatingRange.Good.from && rating < RatingRange.Good.to) {
    return RatingLevel.Good;
  }
  if(rating >= RatingRange.VeryGood.from && rating < RatingRange.VeryGood.to) {
    return RatingLevel.VeryGood;
  }
  if(rating >= RatingRange.Awesome) {
    return RatingLevel.Awesome;
  }
};

function FilmOverviewsTab({film}: Props): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRating(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        {film.starring && <p className="film-card__starring"><strong>Starring: {film.starring.join(', ')} and other</strong></p>}
      </div>
    </>
  );
}

export default FilmOverviewsTab;
