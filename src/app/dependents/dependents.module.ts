import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { DependentsDisplayComponent } from './components/dependents-display/dependents-display.component';
import { DependentsComponent } from './containers/dependents/dependents.component';
import { DependentsRoutingModule } from './dependents-routing.module';


@NgModule({
  declarations: [
    DependentsComponent,
    DependentsDisplayComponent,
  ],
  imports: [
    CommonModule,
    DependentsRoutingModule,
    AppMaterialModule,
    SharedModule,
    MatSnackBarModule,
  ],
})
export class DependentsModule { }
