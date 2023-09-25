import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { GenrePipe } from './pipes/genre.pipe';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    GenrePipe,
    ConfirmationDialogComponent
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
