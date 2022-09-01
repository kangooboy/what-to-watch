import { useNavigate } from 'react-router-dom';
import { Film } from '../../types/film';

type Props = {
  film: Film;
}

function PlayButton({film}: Props): JSX.Element {
  const navigate = useNavigate();

  const handlePlayButtonClick = () => {
    navigate(`/player/${film.id}`);
  };

  return (
    <button onClick={handlePlayButtonClick} className="btn btn--play film-card__button" type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s" />
      </svg>
      <span>Play</span>
    </button>
  );
}

export default PlayButton;
