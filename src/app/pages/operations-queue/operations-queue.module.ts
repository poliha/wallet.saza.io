import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OperationsQueuePage } from './operations-queue.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { TruncatePublicKeyPipeModule } from 'src/app/pipes/truncate-public-key.module';
import { SplitOpNamePipeModule } from 'src/app/pipes/split-operation-name-module';

const routes: Routes = [
  {
    path: '',
    component: OperationsQueuePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HeaderComponentModule,
    TruncatePublicKeyPipeModule,
    SplitOpNamePipeModule,
  ],
  declarations: [OperationsQueuePage]
})
export class OperationsQueuePageModule {}
