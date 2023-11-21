import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { PartnersDisplayComponent } from './components/partners-display/partners-display.component';
import { PartnersComponent } from './containers/partners/partners.component';
import { PartnersRoutingModule } from './partners-routing.module';


@NgModule({
  declarations: [
    PartnersComponent,
    PartnersDisplayComponent,
  ],
  imports: [
    CommonModule,
    PartnersRoutingModule,
    AppMaterialModule,
    SharedModule,
    MatSnackBarModule,
  ],
})
export class PartnersModule { }
