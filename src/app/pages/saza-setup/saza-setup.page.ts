import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators, Utility, UserService } from '../../providers/providers';
@Component({
  selector: 'app-saza-setup',
  templateUrl: './saza-setup.page.html',
  styleUrls: ['./saza-setup.page.scss'],
})
export class SazaSetupPage implements OnInit {
  suggestedPassword = '';
  private passwordForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private utility: Utility, private userService: UserService) { }

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

  formSubmit(){
    // check that passwords match
    // get hash of password
    // generate recovery password
    // use recovery password to encrypt main password
    // save hash of password
    // save encrypted password
    // return recovery password to user in plain text
    try {
      const passwordHash = this.utility.getHash(this.password.value)
      const recoveryPassword = this.utility.generatePassword();
      console.log("hash valid: ", this.utility.validateHash(this.password.value, passwordHash))

      const encrpytedPassword = this.utility.encrypt(this.password.value, recoveryPassword)
      console.log("PE: ", encrpytedPassword);
      console.log("PH: ", passwordHash);
      console.log("PR: ", recoveryPassword)
      this.userService.setPassword(encrpytedPassword);
      this.userService.setPasswordRecovery(recoveryPassword);

    } catch (error) {
      
    }

  }

}
