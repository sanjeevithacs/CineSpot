export type User = {
  id: string;
  username: string;
};

export type City = {
  id: number;
  name: string;
};

export type Movie = {
  id: string;
  title: string;
  description: string;
  posterId: string;
};

export type Theatre = {
  id: string;
  name: string;
  cityId: number;
};

export type Show = {
  id: string;
  movieId: string;
  theatreId: string;
  time: string;
  price: number;
};

export type Booking = {
  id: string;
  showId: string;
  userId: string;
  seats: string[];
  totalAmount: number;
  bookingTime: string;
};
