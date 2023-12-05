import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';

import { LocationModel } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly API = 'api/locations';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<LocationModel[]>(this.API);
  }

  findById(_id: string) {
    return this.httpClient.get<LocationModel>(`${this.API}/${_id}`);
  }

  save(location: Partial<LocationModel>) {
    if (location._id) {
      return this.update(location);
    }

    return this.create(location);
  }

  private create(location: Partial<LocationModel>) {
    return this.httpClient.post<LocationModel>(this.API, location).pipe(first());
  }

  private update(location: Partial<LocationModel>) {
    return this.httpClient.put<LocationModel>(`${this.API}/${location._id}`, location).pipe(first());
  }

  delete(id: String) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
