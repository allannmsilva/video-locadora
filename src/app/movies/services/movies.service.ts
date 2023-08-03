import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  list(): Movie[] {
    return [
      { _id: '1', title: 'A Freira', genre: 'Terror' }
    ];
  }
}
