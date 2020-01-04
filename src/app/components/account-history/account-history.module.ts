import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountHistoryComponent } from './account-history.component';
import { StellarService } from 'src/app/providers/providers';
import { TruncatePublicKeyPipeModule } from 'src/app/pipes/truncate-public-key.module';
import { SplitOpNamePipeModule } from 'src/app/pipes/split-operation-name-module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, TruncatePublicKeyPipeModule,
  SplitOpNamePipeModule ],
  declarations: [AccountHistoryComponent],
  exports: [AccountHistoryComponent],
  providers: [
    StellarService,
  ]
})
export class AccountHistoryComponentModule {}
