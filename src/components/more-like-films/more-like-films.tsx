import FilmCard from '../film-card/film-card';

import { Film } from '../../types/film';

type Props = {
  moreLikeFilms: Film[];
}

function MoreLikeFilms({moreLikeFilms}: Props) {
  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      <div className="catalog__films-list">
        {moreLikeFilms.map((item) => (
          <FilmCard key={item.id} film={item} />
        ))}
      </div>
    </section>
  );
}

export default MoreLikeFilms;
