import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExportAccountPage } from './export-account.page';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { CopyButtonComponentModule } from 'src/app/components/copy-button/copy-button.module';

const routes: Routes = [
  {
    path: '',
    component: ExportAccountPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    DynamicInputComponentModule,
    HeaderComponentModule,
    CopyButtonComponentModule,
  ],
  declarations: [ExportAccountPage],
})
export class ExportAccountPageModule {}
