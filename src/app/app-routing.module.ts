import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'actors', loadChildren: () => import('./actors/actors.module').then(m => m.ActorsModule) },
  { path: 'directors', loadChildren: () => import('./directors/directors.module').then(m => m.DirectorsModule) },
  { path: 'classes', loadChildren: () => import('./classes/classes.module').then(m => m.ClassesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
