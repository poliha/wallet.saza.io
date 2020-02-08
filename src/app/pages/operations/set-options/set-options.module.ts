import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SetOptionsPage } from './set-options.page';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { TxService } from 'src/app/providers/providers';
import { AccountFlagComponentModule } from 'src/app/components/account-flag/account-flag.module';

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
  ],
  declarations: [SetOptionsPage],
  providers: [TxService],
})
export class SetOptionsPageModule {}
