import { Component, OnInit } from '@angular/core';
import { TxService, NotificationService, Utility, StellarService } from '../../../providers/providers';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-trust',
  templateUrl: './change-trust.page.html',
  styleUrls: ['./change-trust.page.scss'],
})
export class ChangeTrustPage implements OnInit {
  public changeTrustForm: FormGroup;
  pageTitle = 'Change Trust';
  helpUrl = '';
  constructor(private txService: TxService, private notification: NotificationService,
    private utility: Utility, private stellarService: StellarService) { }

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


  private async buildOperation() {
    // build change Trust operation
    // convert xdr.Operation to base64 string
    // save xdr string to be used later in building the transaction
    // reset form
    // Show success or error message

    try {
      const opData = {
        limit: String(this.limit.value),
        asset: this.utility.generateAsset(this.asset.value),
        source: this.source.value,
        opType: this.stellarService.operationType.CHANGE_TRUST
      };

      console.log('change Trust Ops: ', opData);
      const xdrString = await this.stellarService.buildOperation(opData)
      this.txService.addOperation({ type: opData.opType, tx: xdrString });
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
