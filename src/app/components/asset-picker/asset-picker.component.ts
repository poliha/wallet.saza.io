import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from '../../providers/providers';

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

  constructor() { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    console.log('Making asset form...')
    let fg = new FormGroup({
      asset_type: new FormControl('native', Validators.compose([Validators.required])),
      asset_code: new FormControl(null),
      asset_issuer: new FormControl(null)
    });

    this.form.removeControl(this.controlName);
    this.form.addControl(this.controlName, fg);
    console.log('Made asset form...', this.form);
  }

  handleListChange(value) {
    console.log("listV: ", value);
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
    console.log("saV: ", value);
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
