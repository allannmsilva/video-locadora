import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { LocationsDisplayComponent } from './components/locations-display/locations-display.component';
import { LocationsComponent } from './containers/locations/locations.component';
import { LocationsRoutingModule } from './locations-routing.module';


@NgModule({
  declarations: [
    LocationsComponent,
    LocationsDisplayComponent,
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    AppMaterialModule,
    SharedModule,
    MatSnackBarModule,
  ],
})
export class LocationsModule { }
