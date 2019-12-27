import { Component, OnInit } from '@angular/core';
import { TxService, NotificationService } from '../../../providers/providers';
import { Operation } from 'stellar-sdk';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-allow-trust',
  templateUrl: './allow-trust.page.html',
  styleUrls: ['./allow-trust.page.scss'],
})
export class AllowTrustPage implements OnInit {
  public allowTrustForm: FormGroup;
  pageTitle = 'Allow Trust';
  helpUrl = '';
  constructor(private txService: TxService, private notification: NotificationService) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.allowTrustForm = new FormGroup({
      authorize: new FormControl('true', Validators.required)
    });
  }

  // Getters for template
  get source() { return this.allowTrustForm.get('source'); }
  get trustor() { return this.allowTrustForm.get('trustor'); }
  get assetCode() { return this.allowTrustForm.get('assetCode'); }
  get authorize() { return this.allowTrustForm.get('authorize'); }


  private buildOperation() {
    // build allow Trust operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      // to do check if source account is active
      const opsObj = {
        trustor: this.trustor.value,
        assetCode: this.assetCode.value,
        authorize: this.authorize.value === 'true' ? true : false,
        source: this.source.value
      };

      console.log('allow Trust Ops: ', opsObj);
      const allowTrustOperation = Operation.allowTrust(opsObj);
      const xdrString = allowTrustOperation.toXDR().toString('base64');
      this.txService.addOperation({ type: 'allow_trust', tx: xdrString });
      this.notification.show('Operation Added');
      this.allowTrustForm.reset({
        source: this.source.value,
      });
      console.log('allow Trust Ops: ', xdrString);
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
