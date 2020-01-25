import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountBalanceComponent } from './account-balance.component';
import { BalanceItemComponentModule } from '../balance-item/balance-item.module';
import { StellarService } from 'src/app/providers/providers';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, BalanceItemComponentModule],
  declarations: [AccountBalanceComponent],
  providers: [StellarService],
  exports: [AccountBalanceComponent]
})
export class AccountBalanceComponentModule {}
