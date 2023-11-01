import { Director } from './../../../directors/model/director';
import { Movie } from './../../model/movie';
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
import { MoviesService } from '../../services/movies.service';
import { Actor } from 'src/app/actors/model/actor';
import { Class } from 'src/app/classes/model/class';
import { ActorsService } from 'src/app/actors/services/actors.service';
import { DirectorsService } from 'src/app/directors/services/directors.service';
import { ClassesService } from 'src/app/classes/services/classes.service';


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
    MatSnackBarModule,
    NgIf,
    NgFor
  ]
})
export class MovieFormComponent implements OnInit {

  directors: Director[] = [];
  cast: Actor[] = [];
  classes: Class[] = [];

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    synopsis: ['', [Validators.required]],
    category: ['', [Validators.required]],
    director: [new FormControl(), [Validators.required]],
    c: [new FormControl(), [Validators.required]],
    cast: [new FormControl(), [Validators.required]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: MoviesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private directorsService: DirectorsService,
    private actorsService: ActorsService,
    private classesService: ClassesService,
  ) {
    this.directorsService.list().subscribe({
      next: (director: Director[]) => {
        this.directors.push(...director);
      },
      error: _error => {
        this.onError();
      }
    });
    this.classesService.list().subscribe({
      next: (c: Class[]) => {
        this.classes.push(...c);
      },
      error: _error => {
        this.onError();
      }
    });
    this.actorsService.list().subscribe({
      next: (cast: Actor[]) => {
        this.cast.push(...cast);
      },
      error: _error => {
        this.onError();
      }
    });
  }

  ngOnInit(): void {
    const movie: Movie = this.route.snapshot.data['movie'];
    this.form.setValue({ _id: movie._id, name: movie.name, year: movie.year, synopsis: movie.synopsis, category: movie.category, director: movie.director, c: movie.c, cast: movie.cast });
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
    this.openSnackbar('An error ocurred while creating a new movie!');
  }

  private onSucess() {
    this.openSnackbar('Movie saved successfuly!');
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
