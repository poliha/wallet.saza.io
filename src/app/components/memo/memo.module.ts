import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoComponent } from './memo.component';
import { DynamicInputComponentModule } from '../dynamic-input/dynamic-input.module';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule, DynamicInputComponentModule, ReactiveFormsModule],
  declarations: [MemoComponent],
  exports: [MemoComponent]
})
export class MemoComponentModule {}
