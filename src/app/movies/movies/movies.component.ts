import { Component, OnInit } from '@angular/core';

import { Movie } from '../model/movie';
import { MoviesService } from './../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  displayedColumns = ['title', 'genre'];
  //moviesService: MoviesService;

  constructor(private moviesService: MoviesService) {
    //this.moviesService = new MoviesService();
    //this.movies = this.moviesService.list();
  }

  ngOnInit(): void {
    this.movies = this.moviesService.list();
  }

}
