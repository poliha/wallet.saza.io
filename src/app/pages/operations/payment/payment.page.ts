import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TxService, Utility, StellarService, NotificationService } from '../../../providers/providers';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  private paymentForm: FormGroup;
  pageTitle = 'Payment';
  helpUrl = '';
  constructor(private txService: TxService, private utility: Utility,
    private stellarService: StellarService, private notification: NotificationService) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.paymentForm = new FormGroup({});
  }

  // Getters for template
  get source() { return this.paymentForm.get('source'); }
  get destination() { return this.paymentForm.get('destination'); }
  get asset() { return this.paymentForm.get('asset'); }
  get amount() { return this.paymentForm.get('amount'); }

  async buildOperation() {
    // build payment operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      let destination = this.destination.value;
      if (destination.includes('*')) {
        // get account id for federated address
        const { account_id, memo_type, memo } = await this.stellarService.resolveFederatedAddress(destination);
        destination = account_id;
        await this.txService.setMemo({ memo_type, memo });
      }

      const isDestActive = await this.stellarService.isAccountActive(destination);

      let opData;

      if (!isDestActive) {
        // make a create-account operation
        const { asset_type } = this.asset.value;
        if (asset_type !== 'native') {
          this.notification.show('Can not send custom asset to inactive destination. Send XLM to create the destination account.');
          return;
        }
        opData = {
          destination,
          startingBalance: String(this.amount.value),
          source: this.source.value,
          opType: this.stellarService.operationType.CREATE_ACCOUNT
        };
      } else {
        opData = {
          destination,
          amount: String(this.amount.value),
          asset: this.utility.generateAsset(this.asset.value),
          source: this.source.value,
          opType: this.stellarService.operationType.PAYMENT
        };
      }

      const xdrString = await this.stellarService.buildOperation(opData);
      this.txService.addOperation({ type: opData.opType, tx: xdrString });
      console.log('paymentOps: ', opData);
      console.log('paymentOps: ', xdrString);

      this.paymentForm.reset({
        source: this.source.value,
        asset: { asset_type: 'native' }
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }

}
