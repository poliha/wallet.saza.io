import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PathSendPage } from './path-send.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { MaterialModule } from 'src/app/material.module';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';
import { AssetPickerComponentModule } from 'src/app/components/asset-picker/asset-picker.module';

const routes: Routes = [
  {
    path: '',
    component: PathSendPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HeaderComponentModule,
    MaterialModule,
    DynamicInputComponentModule,
    SelectSourceComponentModule,
    ReactiveFormsModule,
    AssetPickerComponentModule,
  ],
  declarations: [PathSendPage],
})
export class PathSendPageModule {}
