import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuildTxPage } from './build-tx.page';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';
import { TxService, StellarService } from 'src/app/providers/providers';
import { MemoComponentModule } from 'src/app/components/memo/memo.module';

const routes: Routes = [
  {
    path: '',
    component: BuildTxPage
  }
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
    MemoComponentModule
  ],
  providers: [
    TxService,
    StellarService
  ],
  declarations: [BuildTxPage]
})
export class BuildTxPageModule {}
