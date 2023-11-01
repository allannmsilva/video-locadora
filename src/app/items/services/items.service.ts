import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private readonly API = 'api/items';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Item[]>(this.API)
      .pipe(
        first(), /* take(1) - servidor dá a resposta, utiliza e finaliza inscrição na origem de dados */
        tap(items => console.log(items))
      );
  }

  findById(_id: string) {
    return this.httpClient.get<Item>(`${this.API}/${_id}`);
  }

  save(item: Partial<Item>) {
    if (item._id) {
      return this.update(item);
    }

    return this.create(item);
  }

  private create(item: Partial<Item>) {
    return this.httpClient.post<Item>(this.API, item).pipe(first());
  }

  private update(item: Partial<Item>) {
    return this.httpClient.put<Item>(`${this.API}/${item._id}`, item).pipe(first());
  }

  delete(id: String) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
