import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage extends OperationBuilderComponent
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.pageTitle = 'Create Account';
    this.helpUrl = 'https://docs.saza.io/stellar-operations/create-account';
    this.operationType = this.stellarService.operationType.CREATE_ACCOUNT;
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
  get amount() {
    return this.operationForm.get('amount');
  }

  setOperationData() {
    this.operationData = {
      destination: this.destination.value,
      startingBalance: String(this.amount.value),
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
