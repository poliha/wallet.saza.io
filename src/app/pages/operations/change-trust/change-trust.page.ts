import { Component, OnInit } from '@angular/core';
import { TxService, NotificationService, Utility } from '../../../providers/providers';
import { Operation } from 'stellar-sdk';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-trust',
  templateUrl: './change-trust.page.html',
  styleUrls: ['./change-trust.page.scss'],
})
export class ChangeTrustPage implements OnInit {
  public changeTrustForm: FormGroup;
  constructor(private txService: TxService, private notification: NotificationService, private utility: Utility) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.changeTrustForm = new FormGroup({});
  }

  // Getters for template
  get source() { return this.changeTrustForm.get('source'); }
  get asset() { return this.changeTrustForm.get('asset'); }
  get limit() { return this.changeTrustForm.get('limit'); }


  private buildOperation() {
    // build change Trust operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      // to do check if source account is active
      const opsObj = {
        limit: String(this.limit.value),
        asset: this.utility.generateAsset(this.asset.value),
        source: this.source.value
      };

      console.log('change Trust Ops: ', opsObj);
      const changeTrustOperation = Operation.changeTrust(opsObj);
      const xdrString = changeTrustOperation.toXDR().toString('base64');
      this.txService.addOperation({ type: 'change_trust', tx: xdrString });
      this.notification.show('Operation Added');
      this.changeTrustForm.reset({ source: this.source.value });
      console.log('change Trust Ops: ', xdrString);
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
