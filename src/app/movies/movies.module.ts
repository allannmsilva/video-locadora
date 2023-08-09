import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { MoviesDisplayComponent } from './movies-display/movies-display.component';


@NgModule({
  declarations: [
    MoviesComponent,
    MoviesDisplayComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class MoviesModule { }
