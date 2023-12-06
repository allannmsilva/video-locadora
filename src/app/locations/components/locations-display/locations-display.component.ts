import { Component, EventEmitter, Input, Output, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { LocationModel } from '../../model/location';
import { MatTableDataSource } from '@angular/material/table';
import { LocationsService } from '../../services/locations.service';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-locations-display',
  templateUrl: './locations-display.component.html',
  styleUrls: ['./locations-display.component.scss']
})
export class LocationsDisplayComponent implements OnInit, AfterViewInit {
  @Input() locations: LocationModel[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['item', 'customer', 'worth', 'fine', 'estimatedDevolutionDate', 'devolutionDate', 'locationDate', 'paid', 'actions'];
  dataSource = new MatTableDataSource<LocationModel>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private locationsService: LocationsService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.locationsService.list().subscribe({
      next: (location: LocationModel[]) => {
        this.dataSource.data = location;
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(location: LocationModel) {
    this.edit.emit(location._id);
  }

  onDelete(location: LocationModel) {
    this.delete.emit(location);
  }

  onReturn(location: LocationModel) {
    let returnDate = new Date();
    let expectedReturnDate = new Date(location.estimatedDevolutionDate);
    let fineCharged = 0;
    if (returnDate.valueOf() > expectedReturnDate.valueOf()) {
      fineCharged = (location.item.movie.c.worth as unknown as number * Math.floor((returnDate.valueOf() - expectedReturnDate.valueOf()) / (24 * 60 * 60 * 1000)));
    }
    location.fine = fineCharged.toString();
    location.devolutionDate = formatDate(returnDate, 'yyyy-MM-dd', 'en-US');
    this.locationsService.save(location).subscribe({ next: () => this.onSuccess(), error: () => this.onError() });
  }

  onPay(location: LocationModel) {
    location.paid = "Yes";
    this.locationsService.save(location).subscribe({ next: () => this.onSuccessPay(), error: () => this.onError() });
  }

  private openSnackbar(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
  }

  private onSuccess() {
    this.openSnackbar('Location returned successfuly!');
  }

  private onSuccessPay() {
    this.openSnackbar('Location paid successfuly!');
  }

  private onError() {
    this.openSnackbar('An error ocurred while returning the location!');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
