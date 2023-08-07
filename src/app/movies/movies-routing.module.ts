import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieFormComponent } from './movie-form/movie-form.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'new', component: MovieFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
