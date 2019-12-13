import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignTxPage } from './sign-tx.page';
import { TxService, StellarService } from 'src/app/providers/providers';

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
    ReactiveFormsModule
  ],
  declarations: [SignTxPage],
  providers: [
    TxService,
    StellarService,
  ]
})
export class SignTxPageModule {}
