import { ResolveFn } from '@angular/router';

export const movieResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
