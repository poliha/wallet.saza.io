import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateAccountPage } from './create-account.page';

import { UserService } from '../../providers/providers';
import { AccountPickerComponentModule } from '../../components/account-picker/account-picker.module';

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
    AccountPickerComponentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    UserService
  ],
  declarations: [CreateAccountPage]
})
export class CreateAccountPageModule {}
