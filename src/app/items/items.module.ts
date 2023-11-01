import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ItemsDisplayComponent } from './components/items-display/items-display.component';
import { ItemFormComponent } from './containers/item-form/item-form.component';
import { ItemsComponent } from './containers/items/items.component';
import { ItemsRoutingModule } from './items-routing.module';


@NgModule({
  declarations: [
    ItemsComponent,
    ItemsDisplayComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    AppMaterialModule,
    SharedModule,
    MatSnackBarModule
  ]
})
export class ItemsModule { }
