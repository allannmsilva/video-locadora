import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { Actor } from '../model/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  private readonly API = 'api/actors';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Actor[]>(this.API);
  }

  findById(_id: string) {
    return this.httpClient.get<Actor>(`${this.API}/${_id}`);
  }

  save(actor: Partial<Actor>) {
    if (actor._id) {
      return this.update(actor);
    }

    return this.create(actor);
  }

  private create(actor: Partial<Actor>) {
    return this.httpClient.post<Actor>(this.API, actor).pipe(first());
  }

  private update(actor: Partial<Actor>) {
    return this.httpClient.put<Actor>(`${this.API}/${actor._id}`, actor).pipe(first());
  }

  delete(id: String) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
