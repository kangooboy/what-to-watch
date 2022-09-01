export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  }
};

export type ReviewData = {
  comment: string;
  rating: number;
  id: string;
};
