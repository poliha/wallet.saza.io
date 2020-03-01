import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperationBuilderComponent } from './operation-builder.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [OperationBuilderComponent],
  exports: [OperationBuilderComponent],
})
export class OperationBuilderComponentModule {}
