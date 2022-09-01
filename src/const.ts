export enum AppRoute {
  Review = '/films/:id/review',
  Film = '/films/:id',
  List = '/mylist',
  Root = '/',
  Player = '/player/:id',
  Login = '/login',
  NotFound = '*'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
}

export enum APIRoute {
  Films = '/films',
  PromoFilm = '/promo',
  FavoriteFilms = '/favorite',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum RatingLevel {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}

export enum FilmStatus {
  Favorite = 1,
  Common = 0
}

export enum NameSpace {
  Data = 'DATA',
  Film = 'FILM',
  User = 'USER',
}

export const RatingRange = {
  Bad: {
    from: 0,
    to: 3
  },
  Normal: {
    from: 3,
    to: 5
  },
  Good: {
    from: 5,
    to: 8
  },
  VeryGood: {
    from: 8,
    to: 10
  },
  Awesome: 10
};

export const DEFAULT_GENRE = 'All genres';
export const SHOW_MORE_NEXT_COUNT = 8;
export const SHOW_MORE_BEGIN_COUNT = 0;
export const MINUTES = 60;
