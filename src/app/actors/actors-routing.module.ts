import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActorFormComponent } from './actor-form/actor-form.component';
import { ActorsComponent } from './actors/actors.component';

const routes: Routes = [
  { path: '', component: ActorsComponent },
  { path: 'new', component: ActorFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsRoutingModule { }
