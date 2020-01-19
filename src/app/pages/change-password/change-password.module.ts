import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangePasswordPage } from './change-password.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { RecoveryPasswordModalComponentModule } from 'src/app/components/recovery-password-modal/recovery-password-modal.module';
import { RecoveryPasswordModalComponent } from 'src/app/components/recovery-password-modal/recovery-password-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HeaderComponentModule,
    DynamicInputComponentModule,
    RecoveryPasswordModalComponentModule,
  ],
  declarations: [ChangePasswordPage],
  entryComponents: [RecoveryPasswordModalComponent],
})
export class ChangePasswordPageModule {}
