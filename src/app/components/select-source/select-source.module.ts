import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectSourceComponent } from './select-source.component';
import { DynamicInputComponentModule } from '../dynamic-input/dynamic-input.module';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule, DynamicInputComponentModule ],
  declarations: [SelectSourceComponent],
  exports: [SelectSourceComponent]
})
export class SelectSourceComponentModule {}
