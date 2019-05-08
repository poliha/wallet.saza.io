import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '../../providers/providers';
@Component({
  selector: 'app-saza-setup',
  templateUrl: './saza-setup.page.html',
  styleUrls: ['./saza-setup.page.scss'],
})
export class SazaSetupPage implements OnInit {
  suggestedPassword = '';
  private passwordForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.passwordForm = this.formBuilder.group({
      useSuggestion: [''],
      passwordSaved: ['', Validators.compose([CustomValidators.requiredIf('useSuggestion')
      ])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.minLength(8), Validators.required, CustomValidators.equalTo('password')])],
    });
  }

  setSuggestion(event) {
    if (event.target.checked) {
      this.passwordForm.patchValue({ password: this.suggestedPassword, confirmPassword: this.suggestedPassword });
      this.password.disable();
      this.confirmPassword.disable();
    } else {
      this.passwordForm.reset();
      this.password.enable();
      this.confirmPassword.enable();
    }
  }

  itemCopied(item) {
    console.log("item: ", item);
  }

  getPassword(password) {
    this.suggestedPassword = password;
    console.log("suggested PW: ", this.suggestedPassword);
  }

  // Getters for template
  get password() { return this.passwordForm.get('password'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }
  get useSuggestion() { return this.passwordForm.get('useSuggestion'); }
}
