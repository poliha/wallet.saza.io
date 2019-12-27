import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPickerComponent } from './account-picker.component';
import { TruncatePublicKey } from 'src/app/pipes/truncate-public-key';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, ],
  declarations: [
    AccountPickerComponent,
    TruncatePublicKey,
  ],
  exports: [AccountPickerComponent]
})
export class AccountPickerComponentModule {}
