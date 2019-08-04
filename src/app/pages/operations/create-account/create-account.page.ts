import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Utility, UserService, TxService, CustomValidators, INVALID_PASSWORD_ERROR, ENCRYPTION_FAILED_ERROR } from '../../../providers/providers';
import { SazaAccount } from '../../../interfaces/saza';
import {
  Keypair, Asset, Operation, TransactionBuilder, StrKey,
  FederationServer, StellarTomlResolver, Memo, Account, xdr
} from 'stellar-sdk';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  private createAccountForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private utility: Utility,
    private userService: UserService, private txService: TxService) { }

  ngOnInit() {
    this.txService.operations.subscribe((data) => {
      console.log(data);
    });
    this.makeForm();
  }

  makeForm() {
    this.createAccountForm = this.formBuilder.group({
      source: ['', Validators.compose([Validators.required, CustomValidators.isValidPublicKey()])],
      destination: ['', Validators.compose([Validators.required, CustomValidators.isValidRecipient()])],
      amount: ['', Validators.compose([Validators.required, Validators.min(0)])],
    });
  }

  // Getters for template
  get source() { return this.createAccountForm.get('source'); }
  get destination() { return this.createAccountForm.get('destination'); }
  get amount() { return this.createAccountForm.get('amount'); }

  buildOperation(){
    // build create account operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      // to do check if source account is active
      const opsObj = {
        destination: this.destination.value,
        startingBalance: String(this.amount.value),
        source: this.source.value
      };

      console.log('createAccountOps: ', opsObj);
      const createAccountOperation = Operation.createAccount(opsObj);
      const xdrString = createAccountOperation.toXDR().toString('base64');
      this.txService.addOperation(xdrString);

      console.log('createAccountOps: ', xdrString)
      const buffer = Buffer.from(xdrString, 'base64');
      console.log('cabuffer: ', buffer);
      console.log('cabufferOP: ', xdr.Operation.fromXDR(buffer));
      this.createAccountForm.reset();
    } catch (error) {
      console.log('error: ', error)
    }
  }
}
