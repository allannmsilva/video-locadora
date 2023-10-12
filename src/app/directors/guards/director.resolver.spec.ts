import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { directorResolver } from './director.resolver';
import { Director } from '../model/director';

describe('directorResolver', () => {
  const executeResolver: ResolveFn<Director> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => directorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
