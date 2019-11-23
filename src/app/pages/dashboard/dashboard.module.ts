import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { AccountBalanceComponentModule } from 'src/app/components/account-balance/account-balance.module';
import { AccountPickerComponentModule } from 'src/app/components/account-picker/account-picker.module';
import { UserService } from 'src/app/providers/providers';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AccountBalanceComponentModule,
    AccountPickerComponentModule,
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
