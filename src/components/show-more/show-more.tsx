import { useAppDispatch } from '../../hooks';
import { incrementShowMoreCount } from '../../store/film-process/film-process';

function ShowMore() {
  const dispatch = useAppDispatch();
  const handleButtonClick = () => {
    dispatch(incrementShowMoreCount());
  };

  return (
    <div className="catalog__more">
      <button onClick={handleButtonClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export default ShowMore;
