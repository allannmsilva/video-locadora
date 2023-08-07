import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MoviesService } from './../services/movies.service';


@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss'],
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
export class MovieFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: MoviesService,
    private snackBar: MatSnackBar,
    private location: Location) {
    this.form = this.formBuilder.group({
      title: [null],
      genre: [null]
    });
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
    this.openSnackbar('Erro ao salvar curso!');
  }

  private onSucess() {
    this.openSnackbar('Curso salvo com sucesso!');
    this.onCancel();
  }

}
