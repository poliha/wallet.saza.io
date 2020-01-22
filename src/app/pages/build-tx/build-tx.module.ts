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
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { MaterialModule } from 'src/app/material.module';
import { SazaDateTimeComponentModule } from 'src/app/components/saza-date-time/saza-date-time.module';

const routes: Routes = [
  {
    path: '',
    component: BuildTxPage,
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
    MemoComponentModule,
    HeaderComponentModule,
    MaterialModule,
    SazaDateTimeComponentModule,
  ],
  providers: [TxService, StellarService],
  declarations: [BuildTxPage],
})
export class BuildTxPageModule {}
