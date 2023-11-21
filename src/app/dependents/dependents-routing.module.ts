import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependentsComponent } from './containers/dependents/dependents.component';
import { dependentResolver } from './guards/dependent.resolver';
import { DependentFormComponent } from './containers/dependent-form/dependent-form.component';

const routes: Routes = [
  { path: '', component: DependentsComponent },
  { path: 'new', component: DependentFormComponent, resolve: { dependent: dependentResolver } },
  { path: 'edit/:_id', component: DependentFormComponent, resolve: { dependent: dependentResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DependentsRoutingModule { }
