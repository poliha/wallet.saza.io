import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';

@Component({
  selector: 'app-manage-data',
  templateUrl: './manage-data.page.html',
  styleUrls: ['./manage-data.page.scss'],
})
export class ManageDataPage extends OperationBuilderComponent
  implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.pageTitle = 'Manage Data';
    this.helpUrl = '';
    this.operationType = this.stellarService.operationType.MANAGE_DATA;
    this.makeForm();
  }

  makeForm() {
    this.operationForm = new FormGroup({});
  }

  // Getters for template
  get source() {
    return this.operationForm.get('source');
  }
  get dataName() {
    return this.operationForm.get('dataName');
  }
  get dataValue() {
    return this.operationForm.get('dataValue');
  }

  setOperationData() {
    this.operationData = {
      name: this.dataName.value,
      value: this.dataValue.value,
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
