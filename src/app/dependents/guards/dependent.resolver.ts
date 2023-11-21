import { DependentsService } from './../services/dependents.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Dependent } from '../model/dependent';
import { inject } from '@angular/core';
import { Partner } from 'src/app/partners/model/partner';

export const dependentResolver: ResolveFn<Dependent> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    dependentsService: DependentsService = inject(DependentsService),
  ): Observable<Dependent> => {

    if (route.params && route.params['_id']) {
      return dependentsService.findById(route.params['_id']);
    }

    return of({ _id: '', name: '', birthDate: '', sex: '', status: '', partner: {} as Partner });
  };
