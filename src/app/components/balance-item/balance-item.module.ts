import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalanceItemComponent } from './balance-item.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, ],
  declarations: [BalanceItemComponent],
  exports: [BalanceItemComponent]
})
export class BalanceItemComponentModule {}
