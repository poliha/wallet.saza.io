import { Component, OnInit } from '@angular/core';
import { Utility, TxService } from '../../../providers/providers';
import { Operation } from 'stellar-sdk';
import { OfferComponent } from 'src/app/components/offer/offer.component';


@Component({
  selector: 'app-sell-offer',
  templateUrl: './sell-offer.page.html',
  styleUrls: ['./sell-offer.page.scss'],
})
export class SellOfferPage extends OfferComponent implements OnInit {

  constructor(private txService: TxService, private utility: Utility) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  // Getters for template
  get offerID() { return this.offerForm.get('offerID'); }


  buildOperation() {
    // build sell offer operation
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
        offerId: this.offerID.value || '0',
        source: this.source.value
      };


      console.log('manageSellOffer: ', opsObj);
      const sellOfferOperation = Operation.manageSellOffer(opsObj);
      const xdrString = sellOfferOperation.toXDR().toString('base64');
      this.txService.addOperation({ type: 'manage_sell_offer', tx: xdrString });

      console.log('manageSellOffer: ', xdrString)
      this.resetForm();
    } catch (error) {
      console.log('error: ', error)
    }
  }
}
