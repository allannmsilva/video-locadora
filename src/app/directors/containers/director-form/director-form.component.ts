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
import { Director } from './../../model/director';

import { ActivatedRoute } from '@angular/router';
import { DirectorsService } from '../../services/directors.service';


@Component({
  selector: 'app-director-form',
  templateUrl: './director-form.component.html',
  styleUrls: ['./director-form.component.scss'],
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
    NgIf
  ]
})
export class DirectorFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(100)]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: DirectorsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const director: Director = this.route.snapshot.data['director'];
    this.form.setValue({ _id: director._id, name: director.name, });
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
    this.openSnackbar('An error ocurred while creating a new director!');
  }

  private onSuccess() {
    this.openSnackbar('Director saved successfuly!');
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
