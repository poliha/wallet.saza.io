import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SazaDateTimeComponent } from './saza-date-time.component';
import { MaterialModule } from 'src/app/material.module';
import { DynamicInputComponentModule } from '../dynamic-input/dynamic-input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    DynamicInputComponentModule,
    ReactiveFormsModule,
  ],
  declarations: [SazaDateTimeComponent],
  exports: [SazaDateTimeComponent],
})
export class SazaDateTimeComponentModule {}
