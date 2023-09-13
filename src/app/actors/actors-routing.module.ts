import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActorFormComponent } from './containers/actor-form/actor-form.component';
import { ActorsComponent } from './containers/actors/actors.component';

const routes: Routes = [
  { path: '', component: ActorsComponent },
  { path: 'new', component: ActorFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsRoutingModule { }
