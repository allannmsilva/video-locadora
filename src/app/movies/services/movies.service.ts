import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly API = '/assets/movies.json';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Movie[]>(this.API)
      .pipe(
        first(), /* take(1) - servidor dá a resposta, utiliza e finaliza inscrição na origem de dados */
        tap(movies => console.log(movies))
      );
  }
}
