import { Dependent } from '../../model/dependent';
import { Location, NgFor, NgIf } from '@angular/common';
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
import { DependentsService } from '../../services/dependents.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PartnersService } from 'src/app/partners/services/partners.service';
import { Partner } from 'src/app/partners/model/partner';


@Component({
  selector: 'app-dependent-form',
  templateUrl: './dependent-form.component.html',
  styleUrls: ['./dependent-form.component.scss'],
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
    NgFor
  ]
})
export class DependentFormComponent implements OnInit {

  partners: Partner[] = [];
  dependent: Dependent;

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
    partner: [new FormControl(), [Validators.required,]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: DependentsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private partnersService: PartnersService) {

    this.partnersService.list().subscribe({
      next: (partner: Partner[]) => {
        this.partners.push(...partner);
        let value: Partner = {} as Partner;
        const add = this.partners.find(partner =>
          partner._id === this.dependent.partner._id
        );
        if (add) value = add;
        this.form.controls['partner'].setValue(value);
      },
      error: _error => {
        this.onError();
      }
    });

    this.dependent = this.route.snapshot.data['dependent'];
  }

  ngOnInit(): void {
    this.form.setValue({ _id: this.dependent._id, name: this.dependent.name, birthDate: this.dependent.birthDate, sex: this.dependent.sex, status: this.dependent.status, partner: this.dependent.partner });
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
    this.openSnackbar('An error ocurred while creating a new dependent!');
  }

  private onSucess() {
    this.openSnackbar('Dependent saved successfuly!');
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
