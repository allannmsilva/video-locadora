import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { dependentResolver } from './dependent.resolver';
import { Dependent } from '../model/dependent';

describe('dependentResolver', () => {
  const executeResolver: ResolveFn<Dependent> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => dependentResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
