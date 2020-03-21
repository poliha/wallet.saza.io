import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SazaSetupPage } from './saza-setup.page';
import { UserService } from '../../providers/providers';

import { RecoveryPasswordModalComponentModule } from '../../components/recovery-password-modal/recovery-password-modal.module';

import { RecoveryPasswordModalComponent } from '../../components/recovery-password-modal/recovery-password-modal.component';
import { AuthGuardService as AuthGuard } from '../../providers/auth-guard.service';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: SazaSetupPage,
    canDeactivate: [AuthGuard],
  },
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
    HeaderComponentModule,
  ],
  declarations: [SazaSetupPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserService],
  entryComponents: [RecoveryPasswordModalComponent],
})
export class SazaSetupPageModule {}
