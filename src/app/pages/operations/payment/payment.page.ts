import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Utility, UserService, TxService, CustomValidators, INVALID_PASSWORD_ERROR, ENCRYPTION_FAILED_ERROR } from '../../../providers/providers';
import { SazaAccount } from '../../../interfaces/saza';
import {
  Keypair, Asset, Operation, TransactionBuilder, StrKey,
  FederationServer, StellarTomlResolver, Memo, Account, xdr
} from 'stellar-sdk';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  private paymentForm: FormGroup

  constructor(private formBuilder: FormBuilder, private utility: Utility,
    private userService: UserService, private txService: TxService) { }

  ngOnInit() {
    this.txService.operations.subscribe((data) => {
      console.log(data);
    });
    this.makeForm();
  }

  makeForm() {
    this.paymentForm = this.formBuilder.group({
      source: ['', Validators.compose([Validators.required, CustomValidators.isValidPublicKey()])],
      destination: ['', Validators.compose([Validators.required, CustomValidators.isValidRecipient()])],
      amount: ['', Validators.compose([Validators.required, Validators.min(0)])],
      asset: ['', Validators.required],
    });
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
      const opsObj = {
        destination: this.destination.value,
        amount: String(this.amount.value),
        asset: Asset.native(), //to do: replace with custom asset
        source: this.source.value
      };

      console.log('paymentOps: ', opsObj);
      const paymentOperation = Operation.payment(opsObj);
      const xdrString = paymentOperation.toXDR().toString('base64');
      this.txService.addOperation(xdrString);

      console.log('paymentOps: ', xdrString)
      const buffer = Buffer.from(xdrString, 'base64');
      console.log('cabuffer: ', buffer);
      console.log('cabufferOP: ', xdr.Operation.fromXDR(buffer));
      this.paymentForm.reset();
    } catch (error) {
      console.log('error: ', error)
    }
  }

}
