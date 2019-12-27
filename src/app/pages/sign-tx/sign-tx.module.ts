import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignTxPage } from './sign-tx.page';
import { TxService, StellarService } from 'src/app/providers/providers';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: SignTxPage
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
    HeaderComponentModule,
  ],
  declarations: [SignTxPage],
  providers: [
    TxService,
    StellarService,
  ]
})
export class SignTxPageModule {}
