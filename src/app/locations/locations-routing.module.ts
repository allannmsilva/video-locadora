import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './containers/locations/locations.component';
import { locationResolver } from './guards/location.resolver';
import { LocationFormComponent } from './containers/location-form/location-form.component';

const routes: Routes = [
  { path: '', component: LocationsComponent },
  { path: 'new', component: LocationFormComponent, resolve: { location: locationResolver } },
  { path: 'edit/:_id', component: LocationFormComponent, resolve: { location: locationResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
