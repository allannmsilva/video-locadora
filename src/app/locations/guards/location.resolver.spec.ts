import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { locationResolver } from './location.resolver';
import { LocationModel } from '../model/location';

describe('locationResolver', () => {
  const executeResolver: ResolveFn<LocationModel> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => locationResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
