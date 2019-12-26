import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LinkAccountPage } from './link-account.page';
import { CopyButtonComponentModule } from 'src/app/components/copy-button/copy-button.module';
import { DynamicInputComponentModule } from 'src/app/components/dynamic-input/dynamic-input.module';

const routes: Routes = [
  {
    path: '',
    component: LinkAccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CopyButtonComponentModule,
    DynamicInputComponentModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LinkAccountPage]
})
export class LinkAccountPageModule {}
