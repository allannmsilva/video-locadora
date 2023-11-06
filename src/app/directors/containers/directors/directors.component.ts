import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Director } from '../../model/director';
import { DirectorsService } from '../../services/directors.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.scss']
})
export class DirectorsComponent implements OnInit {

  directors$: Observable<Director[]> | null = null;
  //directors: Director[] = [];
  displayedColumns = ['name', 'actions'];
  //directorsService: DirectorsService;

  constructor(
    private directorsService: DirectorsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
    //this.directors = this.directorsService.list().subscribe(directors => this.directors = directors);
  }

  refresh() {
    this.directors$ = this.directorsService.list()
      .pipe(
        catchError(error => {
          this.onError('Error displaying directors!');
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

  onDelete(director: Director) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure about deleting director ' + director.name + '?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.directorsService.delete(director._id).subscribe({
          next: () => {
            this.snackBar.open('Director deleted successfully!', 'Close', { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center' });
            this.refresh();
          },
          error: () => this.onError('Director is acting in a movie!')
        },
        );
      }
    });
  }
}
