import { MoviesService } from './../services/movies.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Movie } from '../model/movie';
import { inject } from '@angular/core';

export const movieResolver: ResolveFn<Movie> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    moviesService: MoviesService = inject(MoviesService),
  ): Observable<Movie> => {

    if (route.params && route.params['_id']) {
      return moviesService.findById(route.params['_id']);
    }

    return of({ _id: '', name: '', year: '', synopsis: '', category: '', director: { _id: '', name: '' }, c: { _id: '', name: '', worth: '', devolutionDate: '' }, cast: [] });
  };
