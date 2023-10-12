import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesDisplayComponent } from './components/classes-display/classes-display.component';
import { ClassesComponent } from './containers/classes/classes.component';


@NgModule({
  declarations: [
    ClassesComponent,
    ClassesDisplayComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    AppMaterialModule,
    SharedModule,
    MatSnackBarModule,
  ]
})
export class ClassesModule { }
