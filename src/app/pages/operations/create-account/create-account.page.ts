import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TxService, CustomValidators, NotificationService } from '../../../providers/providers';
import { Operation, xdr } from 'stellar-sdk';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  private createAccountForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private txService: TxService,
    private notification: NotificationService) { }

  ngOnInit() {
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

  private buildOperation() {
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
      this.txService.addOperation({ type: 'create_account', tx: xdrString });
      this.notification.show('Operation Added');
      this.createAccountForm.reset();
      console.log('createAccountOps: ', xdrString)
      const buffer = Buffer.from(xdrString, 'base64');
      console.log('cabuffer: ', buffer);
      console.log('cabufferOP: ', xdr.Operation.fromXDR(buffer));
    } catch (error) {
      console.log('error: ', error)
    }
  }

  addOperation() {
    console.log('adding operation');
    this.buildOperation();
    // to do navigate to next page
  }

  signOperation() {
    console.log('adding operation');
    this.buildOperation();
    // to do navigate to next page
  }
}
