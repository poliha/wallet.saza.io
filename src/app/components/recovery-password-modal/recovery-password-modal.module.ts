import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CopyButtonComponentModule } from '../copy-button/copy-button.module';
import { RecoveryPasswordModalComponent } from './recovery-password-modal.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, CopyButtonComponentModule],
  declarations: [RecoveryPasswordModalComponent],
  exports: [RecoveryPasswordModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecoveryPasswordModalComponentModule {}
