import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  exports:[
    MatRadioModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers:[
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { verticalPosition: 'top', horizontalPosition: 'right' } }
  ]
})
export class UiModule { }
