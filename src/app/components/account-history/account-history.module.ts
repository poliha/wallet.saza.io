import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountHistoryComponent } from './account-history.component';
import { StellarService } from 'src/app/providers/providers';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule,],
  declarations: [AccountHistoryComponent],
  exports: [AccountHistoryComponent],
  providers: [
    StellarService,
  ]
})
export class AccountHistoryComponentModule {}
