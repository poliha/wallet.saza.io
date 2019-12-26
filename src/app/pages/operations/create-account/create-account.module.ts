import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateAccountPage } from './create-account.page';
import { TxService } from '../../../providers/providers';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';

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
    DynamicInputComponentModule,
    SelectSourceComponentModule,
  ],
  providers: [TxService],
  declarations: [CreateAccountPage]
})
export class CreateAccountPageModule {}
