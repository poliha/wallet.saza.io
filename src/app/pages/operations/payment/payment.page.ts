import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TxService, CustomValidators, Utility } from '../../../providers/providers';
import { Operation, xdr } from 'stellar-sdk';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  private paymentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private txService: TxService,
    private utility: Utility) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.paymentForm = this.formBuilder.group({ });

    console.log('PaymentForm: ', this.paymentForm);
  }

  // Getters for template
  get source() { return this.paymentForm.get('source'); }
  get destination() { return this.paymentForm.get('destination'); }
  get asset() { return this.paymentForm.get('asset'); }
  get amount() { return this.paymentForm.get('amount'); }

  buildOperation() {
    // build payment operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      // to do check if source account is active
      // to do handle federated address
      const opsObj = {
        destination: this.destination.value,
        amount: String(this.amount.value),
        asset:  this.utility.generateAsset(this.asset.value), // Asset.native(), //to do: replace with custom asset
        source: this.source.value
      };

      console.log('paymentOps: ', opsObj);
      const paymentOperation = Operation.payment(opsObj);
      const xdrString = paymentOperation.toXDR().toString('base64');
      this.txService.addOperation({ type: 'payment', tx: xdrString });

      console.log('paymentOps: ', xdrString)
      const buffer = Buffer.from(xdrString, 'base64');
      console.log('cabuffer: ', buffer);
      console.log('cabufferOP: ', xdr.Operation.fromXDR(buffer));
      this.paymentForm.reset({asset: {asset_type: 'native'}});
    } catch (error) {
      console.log('error: ', error)
    }
  }

}
