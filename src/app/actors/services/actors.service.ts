import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { Actor } from '../model/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  private readonly API = 'api/actors';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Actor[]>(this.API)
      .pipe(
        first(), /* take(1) - servidor dá a resposta, utiliza e finaliza inscrição na origem de dados */
        tap(actors => console.log(actors))
      );
  }

  save(actor: Partial<Actor>) {
    return this.httpClient.post<Actor>(this.API, actor);
  }
}
