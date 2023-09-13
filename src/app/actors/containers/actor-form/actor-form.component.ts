import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ActorsService } from '../../services/actors.service';


@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.scss'],
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
    MatSnackBarModule
  ]
})
export class ActorFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: ActorsService,
    private snackBar: MatSnackBar,
    private location: Location) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(result => this.onSucess(), error => { this.onError() });
  }

  onCancel() {
    this.location.back();
  }

  private openSnackbar(message: string) {
    this.snackBar.open(message, '', { duration: 5000 });
  }

  private onError() {
    this.openSnackbar('An error ocurred while creating a new actor!');
  }

  private onSucess() {
    this.openSnackbar('Actor created successfuly!');
    this.onCancel();
  }

}
