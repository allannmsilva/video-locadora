import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { classResolver } from './class.resolver';
import { Class } from '../model/class';

describe('classResolver', () => {
  const executeResolver: ResolveFn<Class> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => classResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
