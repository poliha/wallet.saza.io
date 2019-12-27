import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangeTrustPage } from './change-trust.page';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { AssetPickerComponentModule } from 'src/app/components/asset-picker/asset-picker.module';
import { TxService } from 'src/app/providers/providers';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: ChangeTrustPage
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
    AssetPickerComponentModule,
    SelectSourceComponentModule,
    HeaderComponentModule,
  ],
  declarations: [ChangeTrustPage],
  providers: [
    TxService,
  ]
})
export class ChangeTrustPageModule {}
