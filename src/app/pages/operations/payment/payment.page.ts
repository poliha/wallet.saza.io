import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Utility } from '../../../providers/providers';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage extends OperationBuilderComponent implements OnInit {
  pageTitle = 'Payment';
  subTitle = 'Operation';
  helpUrl = '';
  constructor(private utility: Utility) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.operationType = this.stellarService.operationType.PAYMENT;
    this.makeForm();
  }

  makeForm() {
    this.operationForm = new FormGroup({});
  }

  // Getters for template
  get source() {
    return this.operationForm.get('source');
  }
  get destination() {
    return this.operationForm.get('destination');
  }
  get asset() {
    return this.operationForm.get('asset');
  }
  get amount() {
    return this.operationForm.get('amount');
  }

  async setOperationData() {
    let destination = this.destination.value;
    if (destination.includes('*')) {
      // get account id and memo for federated address
      const {
        account_id,
        memo_type,
        memo,
      } = await this.stellarService.resolveFederatedAddress(destination);
      destination = account_id;
      if (memo_type && memo) {
        await this.txService.setMemo({ memo_type, memo });
      }
    }

    const isDestActive = await this.stellarService.isAccountActive(destination);

    if (!isDestActive) {
      // make a create-account operation
      const { asset_type } = this.asset.value;
      if (asset_type !== 'native') {
        this.notification.error(
          'Can not send custom asset to inactive destination. Send XLM to create the destination account.',
        );
        return;
      }
      this.operationData = {
        destination,
        startingBalance: String(this.amount.value),
        source: this.source.value,
        opType: this.operationType,
      };
    } else {
      this.operationData = {
        destination,
        amount: String(this.amount.value),
        asset: this.utility.generateAsset(this.asset.value),
        source: this.source.value,
        opType: this.operationType,
      };
    }
  }

  async saveOperation() {
    this.setOperationData();
    await this.buildOperation();
    this.operationForm.reset({
      source: this.source.value,
      asset: { asset_type: 'native' },
    });
  }

  async sendOperation() {
    this.setOperationData();
    await this.buildTransaction();
  }
}
