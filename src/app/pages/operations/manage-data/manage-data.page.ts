import { Component, OnInit } from '@angular/core';
import { TxService, NotificationService } from '../../../providers/providers';
import { Operation } from 'stellar-sdk';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-data',
  templateUrl: './manage-data.page.html',
  styleUrls: ['./manage-data.page.scss'],
})
export class ManageDataPage implements OnInit {
  public manageDataForm: FormGroup;
  constructor(private txService: TxService, private notification: NotificationService) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.manageDataForm = new FormGroup({});
  }

  // Getters for template
  get source() { return this.manageDataForm.get('source'); }
  get dataName() { return this.manageDataForm.get('dataName'); }
  get dataValue() { return this.manageDataForm.get('dataValue'); }

  private buildOperation() {
    // build manage data operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      // to do check if source account is active
      const opsObj = {
        name: this.dataName.value,
        value: this.dataValue.value,
        source: this.source.value
      };

      console.log('manage Data Ops: ', opsObj);
      const manageDataOperation = Operation.manageData(opsObj);
      const xdrString = manageDataOperation.toXDR().toString('base64');
      this.txService.addOperation({ type: 'manage_data', tx: xdrString });
      this.notification.show('Operation Added');
      this.manageDataForm.reset({ source: this.source.value });
      console.log('manage Data Ops: ', xdrString);;
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
