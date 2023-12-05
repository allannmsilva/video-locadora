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
  movie: Movie;

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.min(1895), Validators.max(new Date().getFullYear())]],
    synopsis: ['', [Validators.required, Validators.maxLength(255)]],
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
        let value: Director = {} as Director;
        const add = this.directors.find(director =>
          director._id === this.movie.director._id
        );
        if (add) value = add;
        this.form.controls['director'].setValue(value);
      },
      error: _error => {
        this.onError();
      }
    });
    this.classesService.list().subscribe({
      next: (c: Class[]) => {
        this.classes.push(...c);
        let value: Class = {} as Class;
        const add = this.classes.find(c =>
          c._id === this.movie.c._id
        );
        if (add) value = add;
        this.form.controls['c'].setValue(value);
      },
      error: _error => {
        this.onError();
      }
    });
    this.actorsService.list().subscribe({
      next: (cast: Actor[]) => {
        const values: Actor[] = [];
        this.cast.push(...cast);
        this.movie.cast.forEach(actor => {
          const add = this.cast.find(actor2 => actor2._id === actor._id);
          if (add) values.push(add)
        })
        this.form.controls['cast'].setValue(values);
      },
      error: _error => {
        this.onError();
      }
    });
    this.movie = this.route.snapshot.data['movie'];
  }

  ngOnInit(): void {
    this.form.setValue({ _id: this.movie._id, name: this.movie.name, year: this.movie.year, synopsis: this.movie.synopsis, category: this.movie.category, director: this.movie.director, c: this.movie.c, cast: this.movie.cast });
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
    this.openSnackbar('An error ocurred while creating a new movie!');
  }

  private onSuccess() {
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

    if (field?.hasError('min')) {
      const requiredMin = field.errors ? field.errors['min']['min'] : 2;
      return `Movies were invented the year of ${requiredMin}!`
    }

    if (field?.hasError('max')) {
      const requiredMax = field.errors ? field.errors['max']['max'] : 2;
      return `Please insert a year before/in ${requiredMax}!`
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 50;
      return `Insert at max ${requiredLength} characters for this field.`
    }

    return 'Invalid field';
  }

}
