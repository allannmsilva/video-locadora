import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ActorsRoutingModule } from './actors-routing.module';
import { ActorsComponent } from './containers/actors/actors.component';
import { ActorsDisplayComponent } from './components/actors-display/actors-display.component';


@NgModule({
  declarations: [
    ActorsComponent,
    ActorsDisplayComponent
  ],
  imports: [
    CommonModule,
    ActorsRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class ActorsModule { }
