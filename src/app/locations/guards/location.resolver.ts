import { LocationsService } from './../services/locations.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { LocationModel } from '../model/location';
import { inject } from '@angular/core';
import { Item } from 'src/app/items/model/item';
import { Customer } from 'src/app/customers/model/customer';

export const locationResolver: ResolveFn<LocationModel> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    locationsService: LocationsService = inject(LocationsService),
  ): Observable<LocationModel> => {

    if (route.params && route.params['_id']) {
      return locationsService.findById(route.params['_id']);
    }

    return of({ _id: '', item: {} as Item, customer: {} as Customer, worth: '', fine: '', estimatedDevolutionDate: '', devolutionDate: '', locationDate: '', paid: '', });
  };
