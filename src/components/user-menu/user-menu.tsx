import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../../store/api-action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { setFavoriteFilmsAction } from '../../store/film-data/film-data';
import { getToken } from '../../services/token';
import { AppRoute, AuthorizationStatus } from '../../const';

function UserMenu(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleAvatarClick = () => navigate(AppRoute.List);

  const handleLinkClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
    dispatch(setFavoriteFilmsAction([]));
  };

  return (
    (!getToken() && authorizationStatus !== AuthorizationStatus.Auth) ?
      <div className="user-block">
        <Link className="user-block__link" to={AppRoute.Login}>Sign in</Link>
      </div>
      :
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar" onClick={handleAvatarClick}>
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <Link className="user-block__link" to={AppRoute.Login} onClick={handleLinkClick}>
            Sign out
          </Link>
        </li>
      </ul>
  );
}

export default UserMenu;
