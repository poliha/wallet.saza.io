import { Component, OnInit } from '@angular/core';
import { Utility, TxService, StellarService } from '../../../providers/providers';
import { OfferComponent } from 'src/app/components/offer/offer.component';


@Component({
  selector: 'app-buy-offer',
  templateUrl: './buy-offer.page.html',
  styleUrls: ['./buy-offer.page.scss'],
})
export class BuyOfferPage extends OfferComponent implements OnInit {
  pageTitle = 'Buy Offer';
  helpUrl = '';
  constructor(private txService: TxService, private utility: Utility, private stellaService: StellarService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  // Getters for template
  get offerID() { return this.offerForm.get('offerID'); }


  async buildOperation() {
    // build buy offer operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      const opData = {
        selling: this.utility.generateAsset(this.selling.value),
        buying: this.utility.generateAsset(this.buying.value),
        buyAmount: this.amount.value,
        price: this.price.value,
        offerId: this.offerID.value || '0',
        source: this.source.value,
        opType: this.stellaService.operationType.MANAGE_BUY_OFFER
      };

      console.log('manageBuyOffer: ', opData);
      const xdrString = await this.stellaService.buildOperation(opData);
      this.txService.addOperation({ type: opData.opType, tx: xdrString });
      console.log('manageBuyOffer: ', xdrString);
      this.resetForm();
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
