import { Component, OnInit } from '@angular/core';
import { TxService, NotificationService } from '../../../providers/providers';
import { Operation } from 'stellar-sdk';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-merge',
  templateUrl: './account-merge.page.html',
  styleUrls: ['./account-merge.page.scss'],
})
export class AccountMergePage implements OnInit {
  public accountMergeForm: FormGroup;
  constructor(private txService: TxService, private notification: NotificationService) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.accountMergeForm = new FormGroup({});
    console.log('form: ', this.accountMergeForm);
  }

  // Getters for template
  get source() { return this.accountMergeForm.get('source'); }
  get destination() { return this.accountMergeForm.get('destination'); }

  private buildOperation() {
    // build account Merge operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      // to do check if source account is active
      const opsObj = {
        destination: this.destination.value,
        source: this.source.value
      };

      console.log('account Merge Ops: ', opsObj);
      const accountMergeOperation = Operation.accountMerge(opsObj);
      const xdrString = accountMergeOperation.toXDR().toString('base64');
      this.txService.addOperation({ type: 'account_merge', tx: xdrString });
      this.notification.show('Operation Added');
      console.log('account Merge Ops: ', xdrString);
      console.log('form: ', this.accountMergeForm);
      this.accountMergeForm.reset({source: this.source.value}, {emitEvent: true});
    } catch (error) {
      console.log('error: ', error);
    }
  }

  addOperation() {
    console.log('adding operation');
    this.buildOperation();
    // to do navigate to next page
  }

  signOperation() {
    console.log('signing operation');
    this.buildOperation();
    // to do navigate to next page
  }
}
