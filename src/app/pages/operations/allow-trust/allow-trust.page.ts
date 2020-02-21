import { Component, OnInit } from '@angular/core';
import {
  TxService,
  NotificationService,
  StellarService,
} from '../../../providers/providers';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-allow-trust',
  templateUrl: './allow-trust.page.html',
  styleUrls: ['./allow-trust.page.scss'],
})
export class AllowTrustPage implements OnInit {
  public allowTrustForm: FormGroup;
  pageTitle = 'Allow Trust';
  subTitle = 'Operation';
  helpUrl = '';
  constructor(
    private txService: TxService,
    private notification: NotificationService,
    private stellarService: StellarService,
  ) {}

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.allowTrustForm = new FormGroup({
      authorize: new FormControl('true', Validators.required),
    });
  }

  // Getters for template
  get source() {
    return this.allowTrustForm.get('source');
  }
  get trustor() {
    return this.allowTrustForm.get('trustor');
  }
  get assetCode() {
    return this.allowTrustForm.get('assetCode');
  }
  get authorize() {
    return this.allowTrustForm.get('authorize');
  }

  private async buildOperation() {
    // build allow Trust operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      const opData = {
        trustor: this.trustor.value,
        assetCode: this.assetCode.value,
        authorize: this.authorize.value === 'true' ? true : false,
        source: this.source.value,
        opType: this.stellarService.operationType.ALLOW_TRUST,
      };

      console.log('allow Trust Ops: ', opData);
      const xdrString = await this.stellarService.buildOperation(opData);
      this.txService.addOperation({ type: opData.opType, tx: xdrString });
      this.notification.success('Operation Added');
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
