import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Partner } from '../../model/partner';
import { PartnersService } from '../../services/partners.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  partners$: Observable<Partner[]> | null = null;
  //partners: Partner[] = [];
  displayedColumns = ['name', 'birthDate', 'sex', 'status', 'address', 'phone', 'cpf', 'actions',];
  //partnersService: PartnersService;

  constructor(
    private partnersService: PartnersService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
    //this.partners = this.partnersService.list().subscribe(partners => this.partners = partners);
  }

  refresh() {
    this.partners$ = this.partnersService.list()
      .pipe(
        catchError(error => {
          this.onError('Error displaying partners!');
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

  onDelete(partner: Partner) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure about deleting partner ' + partner.name + '?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.partnersService.delete(partner._id).subscribe({
          next: () => {
            this.snackBar.open('Partner deleted successfully!', 'Close', { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center' });
            this.refresh();
          },
          error: () => this.onError('An error occurred while attempting to remove the partner')
        },
        );
      }
    });
  }
}
