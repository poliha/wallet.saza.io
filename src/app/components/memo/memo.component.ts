import { Component, OnInit, Input } from '@angular/core';
import { UnsignedHyper } from 'stellar-sdk';
import { Buffer } from 'buffer';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'src/app/providers/providers';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.scss'],
})
export class MemoComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;

  memoTypes = {
    MemoNone: {
      inputType: 'text',
      maxValue: 0
    },
    MemoText: {
      inputType: 'text',
      maxValue: 28
    },
    MemoID: {
      inputType: 'number',
      maxValue: UnsignedHyper.MAX_UNSIGNED_VALUE
    },
    MemoHash: {
      inputType: 'text',
      maxValue: 64
    },
    MemoReturn: {
      inputType: 'text',
      maxValue: 64
    },
  };

  selectedMemo = {
    inputType: 'text',
    maxValue: 0
  };

  memoGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    console.log('Making asset form...')
    this.memoGroup = new FormGroup({
      memoValue: new FormControl(),
      memoType: new FormControl()
    }, { validators: CustomValidators.isValidMemo });

    this.form.removeControl(this.controlName);
    this.form.addControl(this.controlName, this.memoGroup);
    console.log('Made memo form...', this.form);
  }

  // getters
  get memo() { return this.form.get(this.controlName); }
  get memoType() { return this.form.get(`${this.controlName}.memoType`); }
  get memoValue() { return this.form.get(`${this.controlName}.memoValue`); }

  memoChanged(event) {
    this.setMemoType(event.target.value);
    const eventValue = event.target.value;
    this.selectedMemo = this.memoTypes[eventValue];
  }

  setMemoType(value) {
    if (!value) { return; }
    this.memoType.patchValue(value);
  }


}
