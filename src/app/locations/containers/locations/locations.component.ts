import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { LocationModel } from '../../model/location';
import { LocationsService } from '../../services/locations.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locations$: Observable<LocationModel[]> | null = null;
  //locations: Location[] = [];
  displayedColumns = ['item', 'customer', 'worth', 'fine', 'estimatedDevolutionDate', 'devolutionDate', 'locationDate', 'paid', 'actions',];
  //locationsService: LocationsService;

  constructor(
    private locationsService: LocationsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
    //this.locations = this.locationsService.list().subscribe(locations => this.locations = locations);
  }

  refresh() {
    this.locations$ = this.locationsService.list()
      .pipe(
        catchError(error => {
          this.onError('Error displaying locations!');
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

  onDelete(location: LocationModel) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure about deleting location ' + location._id + '?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.locationsService.delete(location._id).subscribe({
          next: () => {
            this.snackBar.open('Location deleted successfully!', 'Close', { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center' });
            this.refresh();
          },
          error: () => this.onError('An error occurred while attempting to remove the location')
        },
        );
      }
    });
  }
}
