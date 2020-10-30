import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuyOfferPage } from './buy-offer.page';
import { AssetPickerComponentModule } from 'src/app/components/asset-picker/asset-picker.module';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { OperationBuilderComponentModule } from 'src/app/components/operation-builder/operation-builder.module';

const routes: Routes = [
  {
    path: '',
    component: BuyOfferPage,
  },
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
    SelectSourceComponentModule,
    HeaderComponentModule,
    OperationBuilderComponentModule,
  ],
  declarations: [BuyOfferPage],
})
export class BuyOfferPageModule {}
