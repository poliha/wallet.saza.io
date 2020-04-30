import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-asset-picker',
  templateUrl: './asset-picker.component.html',
  styleUrls: ['./asset-picker.component.scss'],
})
export class AssetPickerComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() assetInput = 'native';
  assetGroup: FormGroup;
  constructor() {}

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.assetGroup = new FormGroup({
      asset_type: new FormControl(
        this.assetInput,
        Validators.compose([Validators.required]),
      ),
    });

    this.form.removeControl(this.controlName);
    this.form.addControl(this.controlName, this.assetGroup);
    this.form.get(this.controlName).updateValueAndValidity();
  }

  // getters
  get assetObj() {
    return this.form.get(this.controlName);
  }
  get assetType() {
    return this.form.get(`${this.controlName}.asset_type`);
  }
  get assetCode() {
    return this.form.get(`${this.controlName}.asset_code`);
  }
  get assetIssuer() {
    return this.form.get(`${this.controlName}.asset_issuer`);
  }

  get showCustomInput() {
    return this.assetInput !== 'native';
  }

  setAssetType(value) {
    if (!value) {
      return;
    }
    this.form.controls[this.controlName].patchValue({
      asset_type: value,
    });
    this.assetInput = value;
  }
}
