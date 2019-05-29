import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPickerComponent } from './account-picker.component';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule,],
  declarations: [AccountPickerComponent],
  exports: [AccountPickerComponent]
})
export class AccountPickerComponentModule {}
