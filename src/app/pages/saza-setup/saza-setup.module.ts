import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SazaSetupPage } from './saza-setup.page';
import { CopyButtonComponentModule } from '../../components/copy-button/copy-button.module';
import { GeneratePasswordComponent } from '../../components/generate-password/generate-password.component';
import { UserService } from '../../providers/providers';

import { RecoveryPasswordModalComponentModule } from '../../components/recovery-password-modal/recovery-password-modal.module';

import { RecoveryPasswordModalComponent } from '../../components/recovery-password-modal/recovery-password-modal.component';
import { AuthGuardService as AuthGuard } from '../../providers/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SazaSetupPage,
    canDeactivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RecoveryPasswordModalComponentModule,
    CopyButtonComponentModule
  ],
  declarations: [GeneratePasswordComponent, SazaSetupPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    UserService
  ],
  entryComponents: [RecoveryPasswordModalComponent],
})
export class SazaSetupPageModule {}
