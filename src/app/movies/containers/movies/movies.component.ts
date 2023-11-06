import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Movie } from '../../model/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies$: Observable<Movie[]> | null = null;
  //movies: Movie[] = [];
  displayedColumns = ['name', 'year', 'synopsis', 'category', 'director', 'class', 'cast', 'actions'];
  //moviesService: MoviesService;

  constructor(
    private moviesService: MoviesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
    //this.movies = this.moviesService.list().subscribe(movies => this.movies = movies);
  }

  refresh() {
    this.movies$ = this.moviesService.list()
      .pipe(
        catchError(error => {
          this.onError('Error displaying movies!');
          return of([])
        })
      );
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

  onEdit(_id: string) {
    this.router.navigate(['edit', _id], { relativeTo: this.route });
  }

  onDelete(movie: Movie) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure about deleting movie ' + movie.name + '?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.moviesService.delete(movie._id).subscribe({
          next: () => {
            this.snackBar.open('Movie deleted successfully!', 'Close', { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center' });
            this.refresh();
          },
          error: () => this.onError('Movie is present in an Item!')
        },
        );
      }
    });
  }
}
