import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SetOptionsPage } from './set-options.page';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { AccountFlagComponentModule } from 'src/app/components/account-flag/account-flag.module';
import { SignerTypeComponentModule } from 'src/app/components/signer-type/signer-type.module';

const routes: Routes = [
  {
    path: '',
    component: SetOptionsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    DynamicInputComponentModule,
    SelectSourceComponentModule,
    HeaderComponentModule,
    AccountFlagComponentModule,
    SignerTypeComponentModule,
  ],
  declarations: [SetOptionsPage],
})
export class SetOptionsPageModule {}
