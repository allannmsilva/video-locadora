import { ClassesService } from './../services/classes.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Class } from '../model/class';
import { inject } from '@angular/core';

export const classResolver: ResolveFn<Class> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    classesService: ClassesService = inject(ClassesService),
  ): Observable<Class> => {

    if (route.params && route.params['_id']) {
      return classesService.findById(route.params['_id']);
    }

    return of({ _id: '', name: '', worth: '', devolutionDate: '' });
  };
