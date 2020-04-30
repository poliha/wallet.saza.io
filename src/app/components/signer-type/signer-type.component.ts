import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'src/app/providers/providers';

@Component({
  selector: 'app-signer-type',
  templateUrl: './signer-type.component.html',
  styleUrls: ['./signer-type.component.scss'],
})
export class SignerTypeComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;

  signerGroup: FormGroup;
  showCustomFields = false;
  signerTypes = [
    { name: 'Ed25519 Public Key', value: 'ed25519PublicKey' },
    { name: 'SHA256 Hash', value: 'sha256Hash' },
    { name: 'Pre-authorized Transaction Hash', value: 'preAuthTx' },
  ];

  constructor() {}

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    if (!this.form && !this.controlName) {
      throw new Error('Missing form and control name fields');
    }
    this.signerGroup = new FormGroup(
      {
        signerType: new FormControl(),
        signerKey: new FormControl(),
        signerWeight: new FormControl(),
      },
      { validators: CustomValidators.isValidSignerType },
    );

    this.form.removeControl(this.controlName);
    this.form.addControl(this.controlName, this.signerGroup);
  }

  // getters
  get signer() {
    return this.form.get(this.controlName);
  }
  get signerType() {
    return this.form.get(`${this.controlName}.signerType`);
  }
  get signerKey() {
    return this.form.get(`${this.controlName}.signerKey`);
  }
  get signerWeight() {
    return this.form.get(`${this.controlName}.signerWeight`);
  }

  selectSigner(value) {
    if (!value) {
      this.showCustomFields = false;

      return;
    }
    this.showCustomFields = true;
  }

  setMemoType(value) {
    if (!value) {
      this.showCustomFields = false;
      this.signerKey.reset();
      this.signerWeight.reset();
      return;
    }

    this.showCustomFields = true;
  }
}
