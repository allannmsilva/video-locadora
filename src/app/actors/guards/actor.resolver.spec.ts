import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { actorResolver } from './actor.resolver';
import { Actor } from '../model/actor';

describe('actorResolver', () => {
  const executeResolver: ResolveFn<Actor> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => actorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
