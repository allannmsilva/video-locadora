import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { itemResolver } from './item.resolver';
import { Item } from '../model/item';

describe('itemResolver', () => {
  const executeResolver: ResolveFn<Item> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => itemResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
