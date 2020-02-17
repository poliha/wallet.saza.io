import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  TxService,
  NotificationService,
  StellarService,
} from '../../../providers/providers';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  private createAccountForm: FormGroup;
  pageTitle = 'Create Account';
  helpUrl = '';
  constructor(
    private txService: TxService,
    private stellarService: StellarService,
    private notification: NotificationService,
  ) {}

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.createAccountForm = new FormGroup({});
  }

  // Getters for template
  get source() {
    return this.createAccountForm.get('source');
  }
  get destination() {
    return this.createAccountForm.get('destination');
  }
  get amount() {
    return this.createAccountForm.get('amount');
  }

  private async buildOperation() {
    // build create account operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      const opData = {
        destination: this.destination.value,
        startingBalance: String(this.amount.value),
        source: this.source.value,
        opType: this.stellarService.operationType.CREATE_ACCOUNT,
      };

      const xdrString = await this.stellarService.buildOperation(opData);
      console.log('XDR: ', xdrString);
      this.txService.addOperation({ type: opData.opType, tx: xdrString });
      this.notification.success('Operation Added');
      this.createAccountForm.reset({ source: this.source.value });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  addOperation() {
    console.log('adding operation');
    this.buildOperation();
    // to do navigate to dashboard
  }

  signOperation() {
    console.log('adding operation');
    this.buildOperation();
    // to do navigate to build
  }
}
