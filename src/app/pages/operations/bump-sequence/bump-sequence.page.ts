import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';

@Component({
  selector: 'app-bump-sequence',
  templateUrl: './bump-sequence.page.html',
  styleUrls: ['./bump-sequence.page.scss'],
})
export class BumpSequencePage extends OperationBuilderComponent
  implements OnInit {
  public operationForm: FormGroup;
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.pageTitle = 'Bump Sequence';
    this.helpUrl = 'https://docs.saza.io/stellar-operations/bump-sequence';
    this.operationType = this.stellarService.operationType.BUMP_SEQUENCE;
    this.makeForm();
  }

  makeForm() {
    this.operationForm = new FormGroup({});
  }

  // Getters for template
  get source() {
    return this.operationForm.get('source');
  }
  get bumpTo() {
    return this.operationForm.get('bumpTo');
  }

  setOperationData() {
    this.operationData = {
      bumpTo: String(this.bumpTo.value),
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
