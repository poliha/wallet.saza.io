import { Component, OnInit } from '@angular/core';
import { Utility, TxService } from '../../../providers/providers';
import { Operation } from 'stellar-sdk';
import { OfferComponent } from 'src/app/components/offer/offer.component';


@Component({
  selector: 'app-passive-offer',
  templateUrl: './passive-offer.page.html',
  styleUrls: ['./passive-offer.page.scss'],
})
export class PassiveOfferPage extends OfferComponent implements OnInit {

  constructor(private txService: TxService, private utility: Utility) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  buildOperation() {
    // build passive offer operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      // to do check if source account is active
      const opsObj = {
        selling: this.utility.generateAsset(this.selling.value),
        buying: this.utility.generateAsset(this.buying.value),
        amount: this.amount.value,
        price: this.price.value,
        source: this.source.value
      };

      console.log('managePassiveOffer: ', opsObj);
      const passiveOfferOperation = Operation.createPassiveSellOffer(opsObj);
      const xdrString = passiveOfferOperation.toXDR().toString('base64');
      this.txService.addOperation({ type: 'create_passive_sell_offer', tx: xdrString });

      console.log('managePassiveOffer: ', xdrString);
      this.resetForm();
    } catch (error) {
      console.log('error: ', error)
    }
  }
}
