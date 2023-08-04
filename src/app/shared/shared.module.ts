import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { GenrePipe } from './pipes/genre.pipe';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    GenrePipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    GenrePipe
  ]
})
export class SharedModule { }
