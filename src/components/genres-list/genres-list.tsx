import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre, resetShowMoreCount } from '../../store/film-process/film-process';
import { getGenre, getFilms } from '../../store/film-process/selectors';
import { DEFAULT_GENRE } from '../../const';

function GenresList(): JSX.Element {
  const dispatch = useAppDispatch();
  const films = useAppSelector(getFilms);
  const genre = useAppSelector(getGenre);
  const genres = new Set([DEFAULT_GENRE]);
  films.map((item) => genres.add(item.genre));
  const filteredGenres = [...genres];

  const handleGenreClick = (item: string) => {
    dispatch(changeGenre(item));
    dispatch(resetShowMoreCount());
  };

  return (
    <ul className="catalog__genres-list">
      {filteredGenres.map((item) => (
        <li key={item} onClick={() => handleGenreClick(item)}

          className={item === genre ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'} style={{cursor:'pointer'}}
        >
          <span className="catalog__genres-link">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
