import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../providers/providers';
import { SazaAccount } from '../../interfaces/saza';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-source',
  templateUrl: './select-source.component.html',
  styleUrls: ['./select-source.component.scss'],
})
export class SelectSourceComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() selected = '';
  @Input() isRequired = false;

  public userAccounts: SazaAccount[];
  public showCustomInput = false;
  public customInputForm: FormGroup;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userAccounts.subscribe((data) => {
      this.userAccounts = data;
    });
    this.makeForm();
  }

  makeForm() {
    this.customInputForm = new FormGroup({});
  }

  // getters
  get customPublicKey() {
    return this.customInputForm.get('customPublicKey');
  }

  accountChanged(event) {
    const eventValue = event.target.value;
    this.customInputForm.reset();
    this.form.controls[this.controlName].reset();
    this.toggleCustomInput(eventValue);
    this.setControlNameValue(eventValue);
  }

  toggleCustomInput(value) {
    if (value !== 'custom') {
      this.showCustomInput = false;
    } else {
      this.showCustomInput = true;
    }
  }

  customInputChanged(event) {
    const eventValue = event.target.value;
    this.setControlNameValue(eventValue);
  }

  setControlNameValue(value) {
    if (!value) {
      return;
    }
    this.form.controls[this.controlName].patchValue(value);
  }

  // To do load stellar account when source is selected and check if account is active
}
