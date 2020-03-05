import { Component, OnInit } from '@angular/core';
import { Utility } from '../../../providers/providers';
import { OperationBuilderComponent } from 'src/app/components/operation-builder/operation-builder.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sell-offer',
  templateUrl: './sell-offer.page.html',
  styleUrls: ['./sell-offer.page.scss'],
})
export class SellOfferPage extends OperationBuilderComponent implements OnInit {
  pageTitle = 'Sell Offer';
  subTitle = 'Operation';
  helpUrl = '';
  constructor(private utility: Utility) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.pageTitle = 'Sell Offer';
    this.helpUrl = '';
    this.operationType = this.stellarService.operationType.MANAGE_SELL_OFFER;
    this.makeForm();
  }

  makeForm() {
    this.operationForm = new FormGroup({});
  }

  // Getters for template
  get offerID() {
    return this.operationForm.get('offerID');
  }
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
      offerId: this.offerID.value || '0',
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
