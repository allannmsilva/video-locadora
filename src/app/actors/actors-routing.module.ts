import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActorFormComponent } from './containers/actor-form/actor-form.component';
import { ActorsComponent } from './containers/actors/actors.component';
import { actorResolver } from './guards/actor.resolver';

const routes: Routes = [
  { path: '', component: ActorsComponent },
  { path: 'new', component: ActorFormComponent, resolve: { actor: actorResolver } },
  { path: 'edit/:_id', component: ActorFormComponent, resolve: { actor: actorResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorsRoutingModule { }
