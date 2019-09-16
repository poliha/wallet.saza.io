import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetPickerComponent } from './asset-picker.component';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [AssetPickerComponent],
  exports: [AssetPickerComponent]
})
export class AssetPickerComponentModule { }
