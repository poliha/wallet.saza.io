import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Utility, UserService, INVALID_PASSWORD_ERROR } from '../../providers/providers';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  private createAccountForm: FormGroup;
  pairObj: { public: string, private: string } = { public: '', private: '' };
  keypairGenerated = false;
  constructor(private formBuilder: FormBuilder, private utility: Utility,
    private userService: UserService) { }

  ngOnInit() {
    this.makeForm()
  }

  generateKeypair() {
    const pair = this.utility.randomKeypair();
    if (!pair) {
      console.log("pair: ", pair);
      // to do: show error message?
      this.keypairGenerated = false;
    } else {
      this.pairObj.public = pair.publicKey();
      this.pairObj.private = pair.secret();
      this.keypairGenerated = true;
      return;
    }
  }

  makeForm() {
    this.createAccountForm = this.formBuilder.group({
      keysCopied: ['', Validators.requiredTrue],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
    });
  }


  // Getters for template
  get keysCopied() { return this.createAccountForm.get('keysCopied'); }
  get password() { return this.createAccountForm.get('password'); }

  async formSubmit() {
    // check that pairobj is not empty
    // check that password matches hash
    // encrypt secret key.
    // create account object 
    // save account object
    // Clear form
    try {
      if (this.pairObj.public === '' || this.pairObj.private === '') {
        throw new Error('Empty Objects');
      }

      const passwordHash = await this.userService.getPassword()

      if (!this.utility.validateHash(this.password.value, passwordHash)) {
        throw new Error(INVALID_PASSWORD_ERROR);
      }

      const encrpytedObject = this.utility.encrypt(this.pairObj.private, this.password.value)
      const sazaAccount = {
        public: this.pairObj.public,
        private: encrpytedObject
      };

      this.userService.setAccount(sazaAccount);
      this.createAccountForm.reset();
      console.log("account saved")

    } catch (error) {
      // to do handle and show error
      console.log(error);
    }

  }

}
