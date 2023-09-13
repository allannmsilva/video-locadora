import { ActorsService } from './../services/actors.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Actor } from '../model/actor';
import { inject } from '@angular/core';

export const actorResolver: ResolveFn<Actor> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    actorsService: ActorsService = inject(ActorsService),
  ): Observable<Actor> => {

    if (route.params && route.params['_id']) {
      return actorsService.findById(route.params['_id']);
    }

    return of({ _id: '', name: '' });
  };
