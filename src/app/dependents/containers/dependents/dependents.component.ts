import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Dependent } from '../../model/dependent';
import { DependentsService } from '../../services/dependents.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.scss']
})
export class DependentsComponent implements OnInit {

  dependents$: Observable<Dependent[]> | null = null;
  //dependents: Dependent[] = [];
  displayedColumns = ['name', 'birthDate', 'sex', 'status', 'partner', 'actions'];
  //dependentsService: DependentsService;

  constructor(
    private dependentsService: DependentsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
    //this.dependents = this.dependentsService.list().subscribe(dependents => this.dependents = dependents);
  }

  refresh() {
    this.dependents$ = this.dependentsService.list()
      .pipe(
        catchError(error => {
          this.onError('Error displaying dependents!');
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

  onDelete(dependent: Dependent) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure about deleting dependent ' + dependent.name + '?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.dependentsService.delete(dependent._id).subscribe({
          next: () => {
            this.snackBar.open('Dependent deleted successfully!', 'Close', { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center' });
            this.refresh();
          },
          error: () => this.onError('An error occurred while attempting to remove the dependent')
        },
        );
      }
    });
  }
}
