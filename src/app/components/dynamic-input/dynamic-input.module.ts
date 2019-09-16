import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DynamicInputComponent } from './dynamic-input.component';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [DynamicInputComponent],
  exports: [DynamicInputComponent]
})
export class DynamicInputComponentModule { }
