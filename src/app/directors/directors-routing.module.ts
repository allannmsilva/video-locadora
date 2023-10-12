import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirectorFormComponent } from './containers/director-form/director-form.component';
import { DirectorsComponent } from './containers/directors/directors.component';
import { directorResolver } from './guards/director.resolver';

const routes: Routes = [
  { path: '', component: DirectorsComponent },
  { path: 'new', component: DirectorFormComponent, resolve: { director: directorResolver } },
  { path: 'edit/:_id', component: DirectorFormComponent, resolve: { director: directorResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorsRoutingModule { }
