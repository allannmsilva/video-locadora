import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Actor } from '../../model/actor';
import { ActorsService } from '../../services/actors.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {

  actors$: Observable<Actor[]> | null = null;
  //actors: Actor[] = [];
  displayedColumns = ['name', 'actions'];
  //actorsService: ActorsService;

  constructor(
    private actorsService: ActorsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
    //this.actors = this.actorsService.list().subscribe(actors => this.actors = actors);
  }

  refresh() {
    this.actors$ = this.actorsService.list()
      .pipe(
        catchError(error => {
          this.onError('Error displaying actors!');
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

  onDelete(actor: Actor) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure about deleting actor ' + actor.name + '?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.actorsService.delete(actor._id).subscribe({
          next: () => {
            this.snackBar.open('Actor deleted successfully!', 'X', { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center' });
            this.refresh();
          },
          error: () => this.onError('An error occurred while attempting to remove the actor')
        },
        );
      }
    });
  }
}
