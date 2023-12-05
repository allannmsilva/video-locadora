import { ItemsService } from './../services/items.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Item } from '../model/item';
import { inject } from '@angular/core';

export const itemResolver: ResolveFn<Item> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    itemsService: ItemsService = inject(ItemsService),
  ): Observable<Item> => {

    if (route.params && route.params['_id']) {
      return itemsService.findById(route.params['_id']);
    }

    return of({ _id: '', movie: { _id: '', name: '', year: '', synopsis: '', category: '', director: { _id: '', name: '' }, c: { _id: '', name: '', worth: '', returnDeadline: '' }, cast: [] }, serialNumber: '', type: '', acquisitionDate: '' });
  };
