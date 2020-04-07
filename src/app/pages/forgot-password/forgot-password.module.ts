import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPage } from './forgot-password.page';
import { MaterialModule } from 'src/app/material.module';
import { RecoveryPasswordModalComponentModule } from 'src/app/components/recovery-password-modal/recovery-password-modal.module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { RecoveryPasswordModalComponent } from 'src/app/components/recovery-password-modal/recovery-password-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
    RecoveryPasswordModalComponentModule,
    HeaderComponentModule,
  ],
  declarations: [ForgotPasswordPage],
  entryComponents: [RecoveryPasswordModalComponent],
})
export class ForgotPasswordPageModule {}
