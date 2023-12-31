import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { MoviesDisplayComponent } from './components/movies-display/movies-display.component';
import { MoviesComponent } from './containers/movies/movies.component';
import { MoviesRoutingModule } from './movies-routing.module';


@NgModule({
  declarations: [
    MoviesComponent,
    MoviesDisplayComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    AppMaterialModule,
    SharedModule,
    MatSnackBarModule,
  ],
})
export class MoviesModule { }
