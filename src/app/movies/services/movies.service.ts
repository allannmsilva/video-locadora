import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly API = 'api/movies';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Movie[]>(this.API);
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
