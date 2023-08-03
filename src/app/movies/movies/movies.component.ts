import { Component } from '@angular/core';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

  movies: Movie[] = [
    { _id: '1', title: 'House', genre: 'Drama' }
  ];
  displayedColumns = ['title','genre'];

  constructor(){
  }

  ngOnInit(): void {

  }

}
