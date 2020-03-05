import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';

@Component({
  selector: 'app-account-merge',
  templateUrl: './account-merge.page.html',
  styleUrls: ['./account-merge.page.scss'],
})
export class AccountMergePage extends OperationBuilderComponent
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.pageTitle = 'Account Merge';
    this.helpUrl = '';
    this.operationType = this.stellarService.operationType.ACCOUNT_MERGE;
    this.makeForm();
  }

  makeForm() {
    this.operationForm = new FormGroup({});
    console.log('form: ', this.operationForm);
  }

  // Getters for template
  get source() {
    return this.operationForm.get('source');
  }
  get destination() {
    return this.operationForm.get('destination');
  }

  setOperationData() {
    this.operationData = {
      destination: this.destination.value,
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
