import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { movieResolver } from './movie.resolver';
import { Movie } from '../model/movie';

describe('movieResolver', () => {
  const executeResolver: ResolveFn<Movie> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => movieResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
