import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DirectorsDisplayComponent } from './components/directors-display/directors-display.component';
import { DirectorsComponent } from './containers/directors/directors.component';
import { DirectorsRoutingModule } from './directors-routing.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    DirectorsComponent,
    DirectorsDisplayComponent
  ],
  imports: [
    CommonModule,
    DirectorsRoutingModule,
    AppMaterialModule,
    SharedModule,
    MatSnackBarModule,
  ]
})
export class DirectorsModule { }
