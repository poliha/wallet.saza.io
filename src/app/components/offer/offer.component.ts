import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  public offerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.offerForm = new FormGroup({});
  }

  // Getters for template
  get source() { return this.offerForm.get('source'); }
  get selling() { return this.offerForm.get('selling'); }
  get buying() { return this.offerForm.get('buying'); }
  get amount() { return this.offerForm.get('amount'); }
  get price() { return this.offerForm.get('price'); }

  resetForm() {
    this.offerForm.reset({
      source: this.source.value,
      selling: { asset_type: 'native' },
      buying: { asset_type: 'native' },
    });
  }
}
