import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPickerComponent } from './account-picker.component';
import { TruncatePublicKeyPipeModule } from 'src/app/pipes/truncate-public-key.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruncatePublicKeyPipeModule,
  ],
  declarations: [AccountPickerComponent],
  exports: [AccountPickerComponent],
})
export class AccountPickerComponentModule {}
