import { LocationsModule } from './locations/locations.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'actors' },
  { path: 'actors', loadChildren: () => import('./actors/actors.module').then(a => a.ActorsModule) },
  { path: 'directors', loadChildren: () => import('./directors/directors.module').then(d => d.DirectorsModule) },
  { path: 'classes', loadChildren: () => import('./classes/classes.module').then(c => c.ClassesModule) },
  { path: 'movies', loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule) },
  { path: 'items', loadChildren: () => import('./items/items.module').then(i => i.ItemsModule) },
  { path: 'partners', loadChildren: () => import('./partners/partners.module').then(p => p.PartnersModule) },
  { path: 'dependents', loadChildren: () => import('./dependents/dependents.module').then(d => d.DependentsModule) },
  { path: 'locations', loadChildren: () => import('./locations/locations.module').then(l => l.LocationsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
