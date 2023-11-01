import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { movieResolver } from './movie.resolver';

describe('movieResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => movieResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
