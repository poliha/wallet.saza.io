import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';

@Component({
  selector: 'app-allow-trust',
  templateUrl: './allow-trust.page.html',
  styleUrls: ['./allow-trust.page.scss'],
})
export class AllowTrustPage extends OperationBuilderComponent
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.pageTitle = 'Allow Trust';
    this.helpUrl = '';
    this.operationType = this.stellarService.operationType.ALLOW_TRUST;
    this.makeForm();
  }

  makeForm() {
    this.operationForm = new FormGroup({
      authorize: new FormControl('true', Validators.required),
    });
  }

  // Getters for template
  get source() {
    return this.operationForm.get('source');
  }
  get trustor() {
    return this.operationForm.get('trustor');
  }
  get assetCode() {
    return this.operationForm.get('assetCode');
  }
  get authorize() {
    return this.operationForm.get('authorize');
  }

  setOperationData() {
    this.operationData = {
      trustor: this.trustor.value,
      assetCode: this.assetCode.value,
      authorize: this.authorize.value === 'true' ? true : false,
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
