import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-account-flag',
  templateUrl: './account-flag.component.html',
  styleUrls: ['./account-flag.component.scss'],
})
export class AccountFlagComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() showImmutable = true;
  public flagsGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    console.log('Making flags form...');
    this.flagsGroup = new FormGroup({
      authRequired: new FormControl(false),
      authRevocable: new FormControl(false),
    });

    if (this.showImmutable) {
      this.flagsGroup.addControl('authImmutable', new FormControl(false));
    }

    this.form.removeControl(this.controlName);
    this.form.addControl(this.controlName, this.flagsGroup);
    console.log('Made flags form...', this.flagsGroup);
  }

  // getters
  get assetObj() {
    return this.form.get(this.controlName);
  }
  get authRequired() {
    return this.form.get(`${this.controlName}.authRequired`);
  }
  get authRevocable() {
    return this.form.get(`${this.controlName}.authRevocable`);
  }
  get authImmutable() {
    return this.form.get(`${this.controlName}.authImmutable`);
  }
}
