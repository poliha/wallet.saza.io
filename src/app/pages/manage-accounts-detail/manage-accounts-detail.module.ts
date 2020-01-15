import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageAccountsDetailPage } from './manage-accounts-detail.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { CopyButtonComponentModule } from 'src/app/components/copy-button/copy-button.module';

const routes: Routes = [
  {
    path: '',
    component: ManageAccountsDetailPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HeaderComponentModule,
    CopyButtonComponentModule,
    ReactiveFormsModule,
  ],
  declarations: [ManageAccountsDetailPage],
})
export class ManageAccountsDetailPageModule {}
