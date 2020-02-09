import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignerTypeComponent } from './signer-type.component';
import { DynamicInputComponentModule } from '../dynamic-input/dynamic-input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DynamicInputComponentModule,
  ],
  declarations: [SignerTypeComponent],
  exports: [SignerTypeComponent],
})
export class SignerTypeComponentModule {}
