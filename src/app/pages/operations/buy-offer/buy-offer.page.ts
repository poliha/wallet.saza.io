import { Component, OnInit } from '@angular/core';
import { Utility, TxService } from '../../../providers/providers';
import { Operation, xdr } from 'stellar-sdk';
import { OfferComponent } from 'src/app/components/offer/offer.component';


@Component({
  selector: 'app-buy-offer',
  templateUrl: './buy-offer.page.html',
  styleUrls: ['./buy-offer.page.scss'],
})
export class BuyOfferPage extends OfferComponent implements OnInit {

  constructor(private txService: TxService, private utility: Utility) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  // Getters for template
  get offerID() { return this.offerForm.get('offerID'); }


  buildOperation() {
    // build buy offer operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      // to do check if source account is active
      const opsObj = {
        selling: this.utility.generateAsset(this.selling.value),
        buying: this.utility.generateAsset(this.buying.value),
        buyAmount: this.amount.value,
        price: this.price.value,
        offerId: this.offerID.value,
        source: this.source.value
      };

      console.log('manageBuyOffer: ', opsObj);
      const buyOfferOperation = Operation.manageBuyOffer(opsObj);
      const xdrString = buyOfferOperation.toXDR().toString('base64');
      this.txService.addOperation({ type: 'manage_buy_offer', tx: xdrString });

      console.log('manageBuyOffer: ', xdrString)
      const buffer = Buffer.from(xdrString, 'base64');
      console.log('cabuffer: ', buffer);
      console.log('cabufferOP: ', xdr.Operation.fromXDR(buffer));
      this.resetForm();
    } catch (error) {
      console.log('error: ', error)
    }
  }
}
