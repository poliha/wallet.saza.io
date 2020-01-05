import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OperationsQueueDetailPage } from './operations-queue-detail.page';
import { SplitOpNamePipeModule } from 'src/app/pipes/split-operation-name-module';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { SplitOpName } from 'src/app/pipes/split-operation-name';

const routes: Routes = [
  {
    path: '',
    component: OperationsQueueDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SplitOpNamePipeModule,
    HeaderComponentModule,
  ],
  declarations: [OperationsQueueDetailPage],
  providers: [SplitOpName, TitleCasePipe]
})
export class OperationsQueueDetailPageModule {}
