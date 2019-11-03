import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Utility, UserService, TxService, CustomValidators } from '../../../providers/providers';
import { SazaAccount } from '../../../interfaces/saza';
import {
  Keypair, Asset, Operation, TransactionBuilder, StrKey,
  FederationServer, StellarTomlResolver, Memo, Account, xdr
} from 'stellar-sdk';


@Component({
  selector: 'app-sell-offer',
  templateUrl: './sell-offer.page.html',
  styleUrls: ['./sell-offer.page.scss'],
})
export class SellOfferPage implements OnInit {
  private sellOfferForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private txService: TxService) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.sellOfferForm = this.formBuilder.group({
      source: ['', Validators.compose([Validators.required, CustomValidators.isValidPublicKey()])],
      destination: ['', Validators.compose([Validators.required, CustomValidators.isValidRecipient()])],
      amount: ['', Validators.compose([Validators.required, Validators.min(0)])],
      asset: ['xlm', Validators.required],
    });
  }

  // Getters for template
  get source() { return this.sellOfferForm.get('source'); }
  get destination() { return this.sellOfferForm.get('destination'); }
  get asset() { return this.sellOfferForm.get('asset'); }
  get amount() { return this.sellOfferForm.get('amount'); }

  buildOperation() {
    // build payment operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    // try {
    //   // to do check if source account is active
    //   const opsObj = {
    //     destination: this.destination.value,
    //     amount: String(this.amount.value),
    //     asset: Asset.native(), //to do: replace with custom asset
    //     source: this.source.value
    //   };

    //   console.log('paymentOps: ', opsObj);
    //   const paymentOperation = Operation.payment(opsObj);
    //   const xdrString = paymentOperation.toXDR().toString('base64');
    //   this.txService.addOperation(xdrString);

    //   console.log('paymentOps: ', xdrString)
    //   const buffer = Buffer.from(xdrString, 'base64');
    //   console.log('cabuffer: ', buffer);
    //   console.log('cabufferOP: ', xdr.Operation.fromXDR(buffer));
    //   this.sellOfferForm.reset();
    // } catch (error) {
    //   console.log('error: ', error)
    // }
  }
}
