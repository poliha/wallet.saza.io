import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaymentPage } from './payment.page';
import { TxService } from 'src/app/providers/providers';
import { AssetPickerComponentModule } from 'src/app/components/asset-picker/asset-picker.module';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

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
    DynamicInputComponentModule,
    SelectSourceComponentModule,
    HeaderComponentModule,
  ],
  providers: [
    TxService,
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
