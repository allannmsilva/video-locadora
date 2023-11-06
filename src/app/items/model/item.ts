import { Movie } from "src/app/movies/model/movie";

export interface Item {
  _id: string;
  movie: Movie;
  serialNumber: string;
  type: string;
  acquisitionDate: string;
}
