import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private readonly API = 'api/customers';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Customer[]>(this.API);
  }

  findById(_id: string) {
    return this.httpClient.get<Customer>(`${this.API}/${_id}`);
  }
}
