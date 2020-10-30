import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PassiveOfferPage } from './passive-offer.page';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { AssetPickerComponentModule } from 'src/app/components/asset-picker/asset-picker.module';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { OperationBuilderComponentModule } from 'src/app/components/operation-builder/operation-builder.module';

const routes: Routes = [
  {
    path: '',
    component: PassiveOfferPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DynamicInputComponentModule,
    AssetPickerComponentModule,
    SelectSourceComponentModule,
    HeaderComponentModule,
    OperationBuilderComponentModule,
  ],
  declarations: [PassiveOfferPage],
})
export class PassiveOfferPageModule {}
