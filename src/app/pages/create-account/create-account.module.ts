import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateAccountPage } from './create-account.page';
import { AccountBalanceComponentModule } from 'src/app/components/account-balance/account-balance.module';

const routes: Routes = [
  {
    path: '',
    component: CreateAccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AccountBalanceComponentModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CreateAccountPage]
})
export class CreateAccountPageModule {}
