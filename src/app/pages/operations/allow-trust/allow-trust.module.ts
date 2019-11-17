import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllowTrustPage } from './allow-trust.page';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { TxService } from 'src/app/providers/providers';

const routes: Routes = [
  {
    path: '',
    component: AllowTrustPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    DynamicInputComponentModule
  ],
  declarations: [AllowTrustPage],
  providers: [
    TxService,
  ]
})
export class AllowTrustPageModule {}
