import { Component, OnInit } from '@angular/core';
import {
  TxService,
  NotificationService,
  StellarService,
} from '../../../providers/providers';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-merge',
  templateUrl: './account-merge.page.html',
  styleUrls: ['./account-merge.page.scss'],
})
export class AccountMergePage implements OnInit {
  public accountMergeForm: FormGroup;
  pageTitle = 'Account Merge';
  subTitle = 'Operation';
  helpUrl = '';
  constructor(
    private txService: TxService,
    private notification: NotificationService,
    private stellarService: StellarService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.accountMergeForm = new FormGroup({});
    console.log('form: ', this.accountMergeForm);
  }

  // Getters for template
  get source() {
    return this.accountMergeForm.get('source');
  }
  get destination() {
    return this.accountMergeForm.get('destination');
  }

  private async buildOperation() {
    // build account Merge operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      const opData = {
        destination: this.destination.value,
        source: this.source.value,
        opType: this.stellarService.operationType.ACCOUNT_MERGE,
      };

      console.log('account Merge Ops: ', opData);
      const xdrString = await this.stellarService.buildOperation(opData);
      this.txService.addOperation({ type: opData.opType, tx: xdrString });
      this.notification.success('Operation Added');
      console.log('account Merge Ops: ', xdrString);
      this.accountMergeForm.reset({ source: this.source.value });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  addOperation() {
    console.log('adding operation');
    this.buildOperation();
    // to do navigate to next page
  }

  buildTransaction() {
    this.buildOperation();
    this.router.navigate(['build-tx/']);
  }
}
