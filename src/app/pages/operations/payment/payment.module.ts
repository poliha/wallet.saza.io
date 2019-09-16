import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentPage } from './payment.page';
import { TxService } from 'src/app/providers/providers';
import { AssetPickerComponentModule } from 'src/app/components/asset-picker/asset-picker.module';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AssetPickerComponentModule,
    RouterModule.forChild(routes),
    DynamicInputComponentModule
  ],
  providers: [
    TxService,
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
