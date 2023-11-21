import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { Partner } from '../model/partner';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  private readonly API = 'api/partners';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Partner[]>(this.API)
      .pipe(
        first(), /* take(1) - servidor dá a resposta, utiliza e finaliza inscrição na origem de dados */
        tap(partners => console.log(partners))
      );
  }

  findById(_id: string) {
    return this.httpClient.get<Partner>(`${this.API}/${_id}`);
  }

  save(partner: Partial<Partner>) {
    if (partner._id) {
      return this.update(partner);
    }

    return this.create(partner);
  }

  private create(partner: Partial<Partner>) {
    return this.httpClient.post<Partner>(this.API, partner).pipe(first());
  }

  private update(partner: Partial<Partner>) {
    return this.httpClient.put<Partner>(`${this.API}/${partner._id}`, partner).pipe(first());
  }

  delete(id: String) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
