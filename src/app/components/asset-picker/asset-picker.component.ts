import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-asset-picker',
  templateUrl: './asset-picker.component.html',
  styleUrls: ['./asset-picker.component.scss']
})
export class AssetPickerComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() balances: object[] = [];
  @Input() controlName: string;
  @Input() displayType = 'list';
  showCustomFields = false;
  private assetGroup: FormGroup;
  constructor() { }

  ngOnInit() {
    // to do: decide whether to make form based on display type?
    // Validate required inputs
    this.makeForm();
  }

  makeForm() {
    console.log('Making asset form...');
    this.assetGroup = new FormGroup({
      asset_type: new FormControl('native', Validators.compose([Validators.required]))
    });

    this.form.removeControl(this.controlName);
    this.form.addControl(this.controlName, this.assetGroup);
    this.form.get(this.controlName).updateValueAndValidity();
    console.log('Made asset form...', this.form);
  }

  handleListChange(value) {
    console.log('listV: ', value);
    if (value === 'manual') {
      this.displayType = value;
      this.makeForm();
      return;
    }

    this.setAssetFromBalance(value);
  }

  // getters
  get assetObj() { return this.form.get(this.controlName); }
  get assetType() { return this.form.get(`${this.controlName}.asset_type`); }
  get assetCode() { return this.form.get(`${this.controlName}.asset_code`); }
  get assetIssuer() { return this.form.get(`${this.controlName}.asset_issuer`); }

  setAssetType(value) {
    console.log('saV: ', value);
    if (!value) { return; }
    this.form.controls[this.controlName].patchValue({
      asset_type: value
    });
    if (value === 'native') {
      this.showCustomFields = false;
    } else {
      this.showCustomFields = true;
    }
  }

  setAssetFromBalance(balance) {
    if (balance == null) {
      return;
    }

    // to do check logic now that assetGroup is used.
    if (balance.asset_type === 'native') {
      this.form.controls[this.controlName].patchValue({
        asset_type: balance.asset_type
      });
    } else {
      this.form.controls[this.controlName].patchValue({
        asset_type: balance.asset_type,
        asset_code: balance.asset_code,
        asset_issuer: balance.asset_issuer
      });

    }
  }

}
