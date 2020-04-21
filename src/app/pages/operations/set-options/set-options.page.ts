import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';

@Component({
  selector: 'app-set-options',
  templateUrl: './set-options.page.html',
  styleUrls: ['./set-options.page.scss'],
})
export class SetOptionsPage extends OperationBuilderComponent
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.pageTitle = 'Set Options';
    this.helpUrl = 'https://docs.saza.io/stellar-operations/set-options';
    this.operationType = this.stellarService.operationType.SET_OPTIONS;
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

  setOperationData() {
    this.operationData = {
      ...this.operationForm.value,
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
