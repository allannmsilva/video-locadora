import { Partner } from '../../model/partner';
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

import { ActivatedRoute } from '@angular/router';
import { PartnersService } from '../../services/partners.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-partner-form',
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.scss'],
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
    NgIf
  ]
})
export class PartnerFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(100)]],
    birthDate: ['', [Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10)]],
    sex: ['', [Validators.required,]],
    status: ['', [Validators.required,]],
    address: ['', [Validators.required,
    Validators.minLength(20),
    Validators.maxLength(200)]],
    phone: ['', [Validators.required,
    Validators.minLength(9),
    Validators.maxLength(9)]],
    cpf: ['', [Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11)]],
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: PartnersService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const partner: Partner = this.route.snapshot.data['partner'];
    this.form.setValue({ _id: partner._id, name: partner.name, birthDate: partner.birthDate, sex: partner.sex, status: partner.status, address: partner.address, phone: partner.phone, cpf: partner.cpf });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({ next: () => this.onSuccess(), error: () => this.onError() });
  }

  onCancel() {
    this.location.back();
  }

  private openSnackbar(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
  }

  private onError() {
    this.openSnackbar('You cannot inactivate or remove a partner who has locations!');
  }

  private onSuccess() {
    this.openSnackbar('Partner saved successfuly!');
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
