import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from '../../model/item';
import { ItemsService } from '../../services/items.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items$: Observable<Item[]> | null = null;
  //items: Item[] = [];
  displayedColumns = ['movie', 'serialNumber', 'type', 'acquisitionDate', 'actions'];
  //itemsService: ItemsService;

  constructor(
    private itemsService: ItemsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
    //this.items = this.itemsService.list().subscribe(items => this.items = items);
  }

  refresh() {
    this.items$ = this.itemsService.list()
      .pipe(
        catchError(error => {
          this.onError('Error displaying items!');
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

  onDelete(item: Item) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure about deleting item ' + item.serialNumber + '?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.itemsService.delete(item._id).subscribe({
          next: () => {
            this.snackBar.open('Item deleted successfully!', 'Close', { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center' });
            this.refresh();
          },
          error: () => this.onError('An error occurred while attempting to remove the item')
        },
        );
      }
    });
  }
}
