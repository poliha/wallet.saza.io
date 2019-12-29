import { Component, OnInit } from '@angular/core';
import { TxService, NotificationService, StellarService } from '../../../providers/providers';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-data',
  templateUrl: './manage-data.page.html',
  styleUrls: ['./manage-data.page.scss'],
})
export class ManageDataPage implements OnInit {
  public manageDataForm: FormGroup;
  pageTitle = 'Manage Data';
  helpUrl = '';
  constructor(private txService: TxService, private notification: NotificationService,
    private stellarService: StellarService) { }

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

  private async buildOperation() {
    // build manage data operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      const opData = {
        name: this.dataName.value,
        value: this.dataValue.value,
        source: this.source.value,
        opType: this.stellarService.operationType.MANAGE_DATA
      };

      console.log('manage Data Ops: ', opData);
      const xdrString = await this.stellarService.buildOperation(opData)
      this.txService.addOperation({ type: opData.opType, tx: xdrString });
      this.notification.show('Operation Added');
      this.manageDataForm.reset({ source: this.source.value });
      console.log('manage Data Ops: ', xdrString);
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
