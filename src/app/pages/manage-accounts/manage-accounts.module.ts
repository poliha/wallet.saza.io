import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageAccountsPage } from './manage-accounts.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { TruncatePublicKeyPipeModule } from 'src/app/pipes/truncate-public-key.module';

const routes: Routes = [
  {
    path: '',
    component: ManageAccountsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HeaderComponentModule,
    TruncatePublicKeyPipeModule,
  ],
  declarations: [ManageAccountsPage]
})
export class ManageAccountsPageModule {}
