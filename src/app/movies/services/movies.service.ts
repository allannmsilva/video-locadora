import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly API = 'api/movies';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Movie[]>(this.API)
      .pipe(
        first(), /* take(1) - servidor dá a resposta, utiliza e finaliza inscrição na origem de dados */
        tap(movies => console.log(movies))
      );
  }

  findById(_id: string) {
    return this.httpClient.get<Movie>(`${this.API}/${_id}`);
  }

  save(movie: Partial<Movie>) {
    if (movie._id) {
      return this.update(movie);
    }

    return this.create(movie);
  }

  private create(movie: Partial<Movie>) {
    return this.httpClient.post<Movie>(this.API, movie).pipe(first());
  }

  private update(movie: Partial<Movie>) {
    return this.httpClient.put<Movie>(`${this.API}/${movie._id}`, movie).pipe(first());
  }

  delete(id: String) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
