import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Utility, UserService, CustomValidators,
  INVALID_PASSWORD_ERROR, ENCRYPTION_FAILED_ERROR, NotificationService } from '../../providers/providers';
import { SazaAccount } from '../../interfaces/saza';

@Component({
  selector: 'app-link-account',
  templateUrl: './link-account.page.html',
  styleUrls: ['./link-account.page.scss'],
})
export class LinkAccountPage implements OnInit {
  private linkAccountForm: FormGroup;
  pairObj: { public: string, private: string } = { public: '', private: '' };
  keypairGenerated = false;
  constructor(private formBuilder: FormBuilder, private utility: Utility,
    private userService: UserService, public notification: NotificationService) { }

  ngOnInit() {
    this.makeForm();
  }

  generateKeypair() {
    const pair = this.utility.keypairFromPrivateKey(this.privateKey.value);

    if (!pair) {
      console.log("pair: ", pair);
      this.keypairGenerated = false;
    } else {
      this.pairObj.public = pair.publicKey();
      this.pairObj.private = pair.secret();
      this.keypairGenerated = true;
      return;
    }
  }

  makeForm() {
    this.linkAccountForm = this.formBuilder.group({
      privateKey: ['', Validators.compose([Validators.required, CustomValidators.isValidPrivateKey()])],
      keysCopied: ['', Validators.requiredTrue],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
    });
  }


  // Getters for template
  get privateKey() { return this.linkAccountForm.get('privateKey'); }
  get keysCopied() { return this.linkAccountForm.get('keysCopied'); }
  get password() { return this.linkAccountForm.get('password'); }

  async formSubmit() {
    // check that pairobj is not empty
    // check that password matches hash
    // encrypt secret key.
    // create account object 
    // save account object
    // Clear form
    // try {
      if (this.pairObj.public === '' || this.pairObj.private === '') {
        throw new Error('Empty Objects');
      }

      const passwordHash = await this.userService.getPassword()

      if (!this.utility.validateHash(this.password.value, passwordHash)) {
        throw new Error(INVALID_PASSWORD_ERROR);
      }

      const encrpytedObject = this.utility.encrypt(this.pairObj.private, this.password.value)

      if (!encrpytedObject) {
        throw new Error(ENCRYPTION_FAILED_ERROR);
      }

      const sazaAccount: SazaAccount = {
        public: this.pairObj.public,
        private: encrpytedObject
      };

      this.userService.setAccount(sazaAccount);
      this.pairObj.private = '';
      this.pairObj.public = '';
      this.linkAccountForm.reset();
      console.log("account saved")
    this.notification.show('Account linked!');


    // } catch (error) {
      // to do handle and show error
      // console.log(error);
    // }

  }

}
