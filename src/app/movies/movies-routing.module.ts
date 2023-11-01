import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './containers/movies/movies.component';
import { movieResolver } from './guards/movie.resolver';
import { MovieFormComponent } from './containers/movie-form/movie-form.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'new', component: MovieFormComponent, resolve: { movie: movieResolver } },
  { path: 'edit/:_id', component: MovieFormComponent, resolve: { movie: movieResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
