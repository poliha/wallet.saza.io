import { Component, OnInit } from '@angular/core';
import {
  Utility,
  TxService,
  StellarService,
} from '../../../providers/providers';
import { OfferComponent } from 'src/app/components/offer/offer.component';

@Component({
  selector: 'app-passive-offer',
  templateUrl: './passive-offer.page.html',
  styleUrls: ['./passive-offer.page.scss'],
})
export class PassiveOfferPage extends OfferComponent implements OnInit {
  pageTitle = 'Passive Offer';
  subTitle = 'Operation';
  helpUrl = 'helpUrl';
  constructor(
    private txService: TxService,
    private utility: Utility,
    private stellarService: StellarService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  async buildOperation() {
    // build passive offer operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      const opData = {
        selling: this.utility.generateAsset(this.selling.value),
        buying: this.utility.generateAsset(this.buying.value),
        amount: this.amount.value,
        price: this.price.value,
        source: this.source.value,
        opType: this.stellarService.operationType.CREATE_PASSIVE_SELL_OFFER,
      };

      console.log('managePassiveOffer: ', opData);
      const xdrString = await this.stellarService.buildOperation(opData);
      this.txService.addOperation({
        type: 'create_passive_sell_offer',
        tx: xdrString,
      });

      console.log('managePassiveOffer: ', xdrString);
      this.resetForm();
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
