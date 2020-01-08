import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountHistoryDetailPage } from './account-history-detail.page';
import { HeaderComponentModule } from 'src/app/components/header/header.module';
import { SplitOpNamePipeModule } from 'src/app/pipes/split-operation-name-module';
import { SplitOpName } from 'src/app/pipes/split-operation-name';

const routes: Routes = [
  {
    path: '',
    component: AccountHistoryDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HeaderComponentModule,
    SplitOpNamePipeModule
  ],
  declarations: [AccountHistoryDetailPage],
  providers: [SplitOpName, TitleCasePipe]
})
export class AccountHistoryDetailPageModule {}
