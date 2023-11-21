import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { Dependent } from '../model/dependent';

@Injectable({
  providedIn: 'root'
})
export class DependentsService {

  private readonly API = 'api/dependents';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Dependent[]>(this.API)
      .pipe(
        first(), /* take(1) - servidor dá a resposta, utiliza e finaliza inscrição na origem de dados */
        tap(dependents => console.log(dependents))
      );
  }

  findById(_id: string) {
    return this.httpClient.get<Dependent>(`${this.API}/${_id}`);
  }

  save(dependent: Partial<Dependent>) {
    if (dependent._id) {
      return this.update(dependent);
    }

    return this.create(dependent);
  }

  private create(dependent: Partial<Dependent>) {
    return this.httpClient.post<Dependent>(this.API, dependent).pipe(first());
  }

  private update(dependent: Partial<Dependent>) {
    return this.httpClient.put<Dependent>(`${this.API}/${dependent._id}`, dependent).pipe(first());
  }

  delete(id: String) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
