import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassFormComponent } from './containers/class-form/class-form.component';
import { ClassesComponent } from './containers/classes/classes.component';
import { classResolver } from './guards/class.resolver';

const routes: Routes = [
  { path: '', component: ClassesComponent },
  { path: 'new', component: ClassFormComponent, resolve: { class: classResolver } },
  { path: 'edit/:_id', component: ClassFormComponent, resolve: { class: classResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
