import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film } from '../../types/film';
import VideoPlayer from '../video-player/video-player';

type Props = {
  film: Film;
}

let timer: NodeJS.Timeout | null = null;
const AUTOPLAY_TIMEOUT = 1000;

function FilmCard ({film}: Props): JSX.Element {
  const navigate = useNavigate();
  const [isPlay, setIsPlay] = useState(false);

  const handleArticleMouseEnter = () => {
    timer = setTimeout(() => {
      setIsPlay(true);
    }, AUTOPLAY_TIMEOUT);
  };
  const handleArticleMouseLeave = () => {
    if(timer) {
      clearTimeout(timer);
      timer = null;
    }
    setIsPlay(false);
  };
  const handleArticleClick = () => navigate(`/films/${film.id}`);

  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={handleArticleMouseEnter}
      onMouseLeave={handleArticleMouseLeave}
      onClick={handleArticleClick}
    >
      <div className="small-film-card__image">
        <VideoPlayer film={film} isPlay={isPlay} />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
