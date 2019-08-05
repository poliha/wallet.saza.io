import { Component, OnInit, Input} from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UnsignedHyper } from 'stellar-sdk';


@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
})
export class DynamicInputComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() defaultValue: any = null;
  @Input() placeHolder = 'Enter Value';
  @Input() maxValue = null;
  @Input() minValue = 0;
  @Input() inputType = 'number';
  @Input() isRequired = true;
  @Input() hasGroupPrepend = false;
  @Input() hasGroupAppend = false;
  @Input() prependText = '';
  @Input() appendText = '';

  constructor() { }

  ngOnInit() {
    let validators = [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }

    if (this.inputType === 'number') {
      validators.push(Validators.min(this.minValue));
      if (this.maxValue) {
        validators.push(Validators.max(this.maxValue));
      } else {
        this.maxValue = UnsignedHyper.MAX_UNSIGNED_VALUE;
        validators.push(Validators.max(this.maxValue));
      }
    }

    if (this.inputType === 'text') {

      if (this.minValue) {
        validators.push(Validators.minLength(this.minValue));
      }

      if (this.maxValue) {
        validators.push(Validators.maxLength(this.maxValue));
      }
    }

    this.form.addControl(this.controlName,
      new FormControl(this.defaultValue, Validators.compose(validators)));
  }

}
