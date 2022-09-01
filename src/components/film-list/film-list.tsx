import FilmCard from '../film-card/film-card';
import { Film } from '../../types/film';

type Props = {
  films: Film[];
}

function FilmList({films}: Props) {
  return (
    <div className="catalog__films-list">
      {films.map((item) => (
        <FilmCard key={item.id} film={item} />
      ))}
    </div>
  );
}

export default FilmList;
