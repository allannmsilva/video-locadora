import { PartnersService } from './../services/partners.service';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Partner } from '../model/partner';
import { inject } from '@angular/core';

export const partnerResolver: ResolveFn<Partner> =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    partnersService: PartnersService = inject(PartnersService),
  ): Observable<Partner> => {

    if (route.params && route.params['_id']) {
      return partnersService.findById(route.params['_id']);
    }

    return of({ _id: '', name: '', birthDate: '', sex: '', status: '', address: '', phone: '', cpf: '', });
  };
