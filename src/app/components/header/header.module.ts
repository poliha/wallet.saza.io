import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { AccountPickerComponentModule } from '../account-picker/account-picker.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, AccountPickerComponentModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderComponentModule {}
