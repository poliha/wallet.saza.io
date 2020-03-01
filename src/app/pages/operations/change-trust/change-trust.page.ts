import { Component, OnInit } from '@angular/core';
import { Utility } from '../../../providers/providers';
import { FormGroup } from '@angular/forms';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';

@Component({
  selector: 'app-change-trust',
  templateUrl: './change-trust.page.html',
  styleUrls: ['./change-trust.page.scss'],
})
export class ChangeTrustPage extends OperationBuilderComponent
  implements OnInit {
  pageTitle = 'Change Trust';
  subTitle = 'Operation';
  helpUrl = '';
  constructor(private utility: Utility) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.makeForm();
    this.operationType = this.stellarService.operationType.CHANGE_TRUST;
  }

  makeForm() {
    this.operationForm = new FormGroup({});
  }

  // Getters for template
  get source() {
    return this.operationForm.get('source');
  }
  get asset() {
    return this.operationForm.get('asset');
  }
  get limit() {
    return this.operationForm.get('limit');
  }

  setOperationData() {
    this.operationData = {
      limit: String(this.limit.value),
      asset: this.utility.generateAsset(this.asset.value),
      source: this.source.value,
      opType: this.operationType,
    };
  }

  async saveOperation() {
    this.setOperationData();
    await this.buildOperation();
    this.operationForm.reset({ source: this.source.value });
  }

  async sendOperation() {
    this.setOperationData();
    await this.buildTransaction();
  }
}
