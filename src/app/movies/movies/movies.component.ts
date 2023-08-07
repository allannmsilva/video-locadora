import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Movie } from '../model/movie';
import { MoviesService } from './../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies$: Observable<Movie[]>;
  //movies: Movie[] = [];
  displayedColumns = ['title', 'genre', 'actions'];
  //moviesService: MoviesService;

  constructor(
    private moviesService: MoviesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
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

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
