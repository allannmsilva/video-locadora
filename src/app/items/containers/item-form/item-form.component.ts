import { Location, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Item } from './../../model/item';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
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
    MatNativeDateModule,
    MatDatepickerModule,
    NgIf
  ]
})
export class ItemFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    title: ['', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(100)]],
    serialNumber: ['', [Validators.required]],
    type: ['', [Validators.required]],
    acquisitionDate: ['', Validators.required]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: ItemsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const item: Item = this.route.snapshot.data['item'];
    this.form.setValue({ _id: item._id, title: item.title, serialNumber: item.serialNumber, type: item.type, acquisitionDate: item.acquisitionDate });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({ next: () => this.onSucess(), error: () => this.onError() });
  }

  onCancel() {
    this.location.back();
  }

  private openSnackbar(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
  }

  private onError() {
    this.openSnackbar('An error ocurred while creating a new item!');
  }

  private onSucess() {
    this.openSnackbar('Item saved successfuly!');
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
