import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { Director } from '../model/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorsService {

  private readonly API = 'api/directors';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Director[]>(this.API);
  }

  findById(_id: string) {
    return this.httpClient.get<Director>(`${this.API}/${_id}`);
  }

  save(director: Partial<Director>) {
    if (director._id) {
      return this.update(director);
    }

    return this.create(director);
  }

  private create(director: Partial<Director>) {
    return this.httpClient.post<Director>(this.API, director).pipe(first());
  }

  private update(director: Partial<Director>) {
    return this.httpClient.put<Director>(`${this.API}/${director._id}`, director).pipe(first());
  }

  delete(id: String) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
