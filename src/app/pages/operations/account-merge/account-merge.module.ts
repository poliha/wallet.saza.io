import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountMergePage } from './account-merge.page';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { TxService } from 'src/app/providers/providers';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { OperationBuilderComponentModule } from 'src/app/components/operation-builder/operation-builder.module';

const routes: Routes = [
  {
    path: '',
    component: AccountMergePage,
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
    OperationBuilderComponentModule,
  ],
  declarations: [AccountMergePage],
  providers: [TxService],
})
export class AccountMergePageModule {}
