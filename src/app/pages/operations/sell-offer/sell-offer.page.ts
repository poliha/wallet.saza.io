import { Component, OnInit } from '@angular/core';
import { Utility, TxService, StellarService } from '../../../providers/providers';
import { OfferComponent } from 'src/app/components/offer/offer.component';


@Component({
  selector: 'app-sell-offer',
  templateUrl: './sell-offer.page.html',
  styleUrls: ['./sell-offer.page.scss'],
})
export class SellOfferPage extends OfferComponent implements OnInit {
  pageTitle = 'Sell Offer';
  subTitle = 'Operation';
  helpUrl = '';
  constructor(private txService: TxService, private utility: Utility,
    private stellarService: StellarService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  // Getters for template
  get offerID() { return this.offerForm.get('offerID'); }


  async buildOperation() {
    // build sell offer operation
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
        offerId: this.offerID.value || '0',
        source: this.source.value,
        opType: this.stellarService.operationType.MANAGE_SELL_OFFER
      };


      console.log('manageSellOffer: ', opData);
      const xdrString = await this.stellarService.buildOperation(opData);
      this.txService.addOperation({ type: opData.opType, tx: xdrString });

      console.log('manageSellOffer: ', xdrString);
      this.resetForm();
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
