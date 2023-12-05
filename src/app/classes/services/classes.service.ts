import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { Class } from '../model/class';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private readonly API = 'api/classes';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Class[]>(this.API);
  }

  findById(_id: string) {
    return this.httpClient.get<Class>(`${this.API}/${_id}`);
  }

  save(c: Partial<Class>) {
    if (c._id) {
      return this.update(c);
    }

    return this.create(c);
  }

  private create(c: Partial<Class>) {
    return this.httpClient.post<Class>(this.API, c).pipe(first());
  }

  private update(c: Partial<Class>) {
    return this.httpClient.put<Class>(`${this.API}/${c._id}`, c).pipe(first());
  }

  delete(id: String) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
