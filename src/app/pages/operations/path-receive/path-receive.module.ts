import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PathReceivePage } from './path-receive.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { MaterialModule } from 'src/app/material.module';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { SelectSourceComponentModule } from 'src/app/components/select-source/select-source.module';
import { AssetPickerComponentModule } from 'src/app/components/asset-picker/asset-picker.module';
import { OperationBuilderComponentModule } from 'src/app/components/operation-builder/operation-builder.module';

const routes: Routes = [
  {
    path: '',
    component: PathReceivePage,
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
    OperationBuilderComponentModule,
  ],
  declarations: [PathReceivePage],
})
export class PathReceivePageModule {}
