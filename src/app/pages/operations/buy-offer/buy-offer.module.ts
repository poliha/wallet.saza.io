import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuyOfferPage } from './buy-offer.page';
import { TxService } from 'src/app/providers/providers';
import { AssetPickerComponentModule } from 'src/app/components/asset-picker/asset-picker.module';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';

const routes: Routes = [
  {
    path: '',
    component: BuyOfferPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AssetPickerComponentModule,
    DynamicInputComponentModule,
    SelectSourceComponentModule
  ],
  declarations: [BuyOfferPage],
  providers: [
    TxService,
  ]
})
export class BuyOfferPageModule {}
