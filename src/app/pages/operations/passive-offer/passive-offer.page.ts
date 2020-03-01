import { Component, OnInit } from '@angular/core';
import { Utility } from '../../../providers/providers';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-passive-offer',
  templateUrl: './passive-offer.page.html',
  styleUrls: ['./passive-offer.page.scss'],
})
export class PassiveOfferPage extends OperationBuilderComponent
  implements OnInit {
  pageTitle = 'Passive Offer';
  subTitle = 'Operation';
  helpUrl = 'helpUrl';
  constructor(private utility: Utility) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.operationType = this.stellarService.operationType.CREATE_PASSIVE_SELL_OFFER;
    this.makeForm();
  }

  makeForm() {
    this.operationForm = new FormGroup({});
  }

  // Getters for template
  get source() {
    return this.operationForm.get('source');
  }
  get selling() {
    return this.operationForm.get('selling');
  }
  get buying() {
    return this.operationForm.get('buying');
  }
  get amount() {
    return this.operationForm.get('amount');
  }
  get price() {
    return this.operationForm.get('price');
  }

  setOperationData() {
    this.operationData = {
      selling: this.utility.generateAsset(this.selling.value),
      buying: this.utility.generateAsset(this.buying.value),
      amount: this.amount.value,
      price: this.price.value,
      source: this.source.value,
      opType: this.operationType,
    };
  }

  async saveOperation() {
    this.setOperationData();
    await this.buildOperation();
    this.operationForm.reset({
      source: this.source.value,
      selling: { asset_type: 'native' },
      buying: { asset_type: 'native' },
    });
  }

  async sendOperation() {
    this.setOperationData();
    await this.buildTransaction();
  }
}
