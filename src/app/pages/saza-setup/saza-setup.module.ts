import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CopyButtonComponent } from '../../components/copy-button/copy-button.component';
import { GeneratePasswordComponent } from '../../components/generate-password/generate-password.component';
import { UserService } from '../../providers/providers';
import { IonicModule } from '@ionic/angular';

import { SazaSetupPage } from './saza-setup.page';

const routes: Routes = [
  {
    path: '',
    component: SazaSetupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GeneratePasswordComponent, CopyButtonComponent, SazaSetupPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    UserService
  ]
})
export class SazaSetupPageModule {}
