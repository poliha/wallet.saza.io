import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PassiveOfferPage } from './passive-offer.page';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { AssetPickerComponentModule } from 'src/app/components/asset-picker/asset-picker.module';
import { TxService } from 'src/app/providers/providers';

const routes: Routes = [
  {
    path: '',
    component: PassiveOfferPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DynamicInputComponentModule,
    AssetPickerComponentModule
  ],
  declarations: [PassiveOfferPage],
  providers: [
    TxService,
  ]
})
export class PassiveOfferPageModule {}