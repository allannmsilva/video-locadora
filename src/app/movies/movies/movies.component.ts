import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { Movie } from '../model/movie';
import { MoviesService } from './../services/movies.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies$: Observable<Movie[]>;
  //movies: Movie[] = [];
  displayedColumns = ['title', 'genre'];
  //moviesService: MoviesService;

  constructor(
    private moviesService: MoviesService,
    public dialog: MatDialog
  ) {
    this.movies$ = this.moviesService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar filmes!');
          return of([])
        })
      );
    //this.movies = this.moviesService.list().subscribe(movies => this.movies = movies);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

}
