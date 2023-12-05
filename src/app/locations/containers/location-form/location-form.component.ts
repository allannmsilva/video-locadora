import { LocationModel } from '../../model/location';
import { Location, NgFor, NgIf, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ActivatedRoute } from '@angular/router';
import { LocationsService } from '../../services/locations.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Item } from 'src/app/items/model/item';
import { Customer } from 'src/app/customers/model/customer';
import { ItemsService } from 'src/app/items/services/items.service';
import { CustomersService } from 'src/app/customers/services/customers.service';


@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgIf,
    NgFor,
  ]
})
export class LocationFormComponent implements OnInit {

  items: Item[] = [];
  customers: Customer[] = [];
  location: LocationModel;

  form = this.formBuilder.group({
    _id: [''],
    item: [new FormControl(), [Validators.required]],
    customer: [new FormControl(), [Validators.required]],
    worth: [''],
    fine: [''],
    estimatedDevolutionDate: [''],
    devolutionDate: [''],
    locationDate: [''],
    paid: ['', [Validators.required,]],
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: LocationsService,
    private snackBar: MatSnackBar,
    private locationService: Location,
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private customersService: CustomersService) {

    this.itemsService.list().subscribe({
      next: (item: Item[]) => {
        this.items.push(...item);
        let value: Item = {} as Item;
        const add = this.items.find(
          item => item._id === this.location.item._id
        );
        if (add) value = add;
        this.form.controls['item'].setValue(value);
      },
      error: _error => {
        this.onError();
      }
    });

    this.customersService.list().subscribe({
      next: (customer: Customer[]) => {
        this.customers.push(...customer);
        let value: Customer = {} as Customer;
        const add = this.customers.find(
          customer => customer._id === this.location.customer._id
        );
        if (add) value = add;
        this.form.controls['customer'].setValue(value);
      },
      error: _error => {
        this.onError();
      }
    });

    this.location = this.route.snapshot.data['location'];
  }

  ngOnInit(): void {
    this.form.setValue({ _id: this.location._id, item: this.location.item, customer: this.location.customer, worth: this.location.worth, fine: this.location.fine, estimatedDevolutionDate: this.location.estimatedDevolutionDate, devolutionDate: this.location.devolutionDate, locationDate: this.location.locationDate, paid: this.location.paid });
  }

  onSubmit() {
    let location = this.form.value as LocationModel;
    let returnDate = new Date(location.devolutionDate);
    let expectedReturnDate = new Date(location.estimatedDevolutionDate);
    let fineCharged = 0;
    if (returnDate.valueOf() > expectedReturnDate.valueOf()) {
      fineCharged = (location.worth as unknown as number * Math.floor((returnDate.valueOf() - expectedReturnDate.valueOf()) / (24 * 60 * 60 * 1000)) + (location.worth as unknown as number));
    }
    location.fine = fineCharged.toString();
    this.service.save(location).subscribe({ next: () => this.onSuccess(), error: () => this.onError() });
  }

  onCancel() {
    this.locationService.back();
  }

  private openSnackbar(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
  }

  private onError() {
    this.openSnackbar('An error ocurred while creating a new location!');
  }

  private onSuccess() {
    this.openSnackbar('Location saved successfuly!');
    this.onCancel();
  }

  onFieldError(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required'))
      return 'You must enter a value for this field.';

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 2;
      return `Insert at least ${requiredLength} characters for this field.`
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 50;
      return `Insert at max ${requiredLength} characters for this field.`
    }

    return 'Invalid field';
  }

}
