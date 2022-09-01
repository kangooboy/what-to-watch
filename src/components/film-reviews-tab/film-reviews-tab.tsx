import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviewsAction } from '../../store/api-action';
import { getReviews } from '../../store/film-data/selectors';
import { Review } from '../../types/review';
import { Film } from '../../types/film';

type Props = {
  film: Film;
}

const dateMessage = (date: string) => new Date(date).toLocaleString('en-us', { year:'numeric', month:'long', day:'numeric'});

function FilmReviewsTab({film}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);

  useEffect(() => {
    dispatch(fetchReviewsAction(`${film.id}`));
  }, [film, dispatch]);

  const ReviewJSX = (data: Review) => (
    <div key={data.id} className="review">
      <blockquote className="review__quote">
        <p className="review__text">{data.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{data.user.name}</cite>
          <time className="review__date" dateTime={dateMessage(data.date)}>{dateMessage(data.date)}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{data.rating}</div>
    </div>
  );

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.filter((i, index) => index % 2 === 0).map((item) => ReviewJSX(item))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.filter((i, index) => index % 2 === 1).map((item) => ReviewJSX(item))}
      </div>
    </div>
  );
}

export default FilmReviewsTab;
