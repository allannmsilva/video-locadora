import { DirectorsService } from './../services/directors.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Director } from '../model/director';
import { inject } from '@angular/core';

export const directorResolver: ResolveFn<Director> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    directorsService: DirectorsService = inject(DirectorsService),
  ): Observable<Director> => {

    if (route.params && route.params['_id']) {
      return directorsService.findById(route.params['_id']);
    }

    return of({ _id: '', name: '' });
  };
