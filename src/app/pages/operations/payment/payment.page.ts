import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TxService, Utility, StellarService, NotificationService } from '../../../providers/providers';
import { Operation } from 'stellar-sdk';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  private paymentForm: FormGroup;

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
      // to do check if source account is active

      let destination = this.destination.value;
      if (destination.includes('*')) {
        // get account id for federated address
        const { account_id, memo_type, memo } = await this.stellarService.resolveFederatedAddress(destination);
        destination = account_id;
        await this.txService.setMemo({ memo_type, memo });
      }

      const isDestActive = this.stellarService.isAccountActive(destination);

      let opsObj = {};

      if (!isDestActive) {
        // make a create-account operation
        const { asset_type } = this.asset.value;
        if (asset_type !== 'native') {
          this.notification.show('Can not send custom asset to inactive destination. Send XLM to create the destination account.');
          return;
        }
        opsObj = {
          destination,
          starting_balance: String(this.amount.value),
          source: this.source.value
        };
        console.log('paymentOps: ', opsObj);

        const paymentOperation = Operation.createAccount(opsObj);
        const xdrString = paymentOperation.toXDR().toString('base64');
        this.txService.addOperation({ type: 'create_account', tx: xdrString });
        console.log('paymentOps: ', xdrString);
      } else {
        opsObj = {
          destination,
          amount: String(this.amount.value),
          asset: this.utility.generateAsset(this.asset.value),
          source: this.source.value
        };
        console.log('paymentOps: ', opsObj);

        const paymentOperation = Operation.payment(opsObj);
        const xdrString = paymentOperation.toXDR().toString('base64');
        this.txService.addOperation({ type: 'payment', tx: xdrString });
        console.log('paymentOps: ', xdrString)
      }

      this.paymentForm.reset({
        source: this.source.value,
        asset: { asset_type: 'native' }
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }

}
