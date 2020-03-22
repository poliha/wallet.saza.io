import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  Utility,
  UserService,
  NotificationService,
  INVALID_PASSWORD_ERROR,
  ENCRYPTION_FAILED_ERROR,
} from '../../providers/providers';
import { SazaAccount } from '../../interfaces/saza';
import { SazaError } from 'src/app/providers/errors';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  createAccountForm: FormGroup;
  userAccounts = [];
  pairObj: { public: string; private: string } = { public: '', private: '' };
  keypairGenerated = false;
  pageTitle = 'Create Account';
  helpUrl = '#';
  constructor(
    private formBuilder: FormBuilder,
    private utility: Utility,
    private userService: UserService,
    private notification: NotificationService,
  ) {}

  ngOnInit() {
    this.userService.userAccounts.subscribe(data => (this.userAccounts = data));
    this.makeForm();
  }

  generateKeypair() {
    const pair = this.utility.randomKeypair();
    if (!pair) {
      console.log('pair: ', pair);
      this.keypairGenerated = false;
      throw new SazaError('Unable to generate keypair.');
    }

    this.pairObj.public = pair.publicKey();
    this.pairObj.private = pair.secret();
    this.keypairGenerated = true;
  }

  makeForm() {
    this.createAccountForm = this.formBuilder.group({
      keysCopied: ['', Validators.requiredTrue],
      password: [
        '',
        Validators.compose([Validators.minLength(8), Validators.required]),
      ],
      tag: [''],
    });
  }

  itemCopied(item) {
    console.log('item: ', item);
  }

  // Getters for template
  get keysCopied() {
    return this.createAccountForm.get('keysCopied');
  }
  get password() {
    return this.createAccountForm.get('password');
  }
  get tag() {
    return this.createAccountForm.get('tag');
  }

  async formSubmit() {
    // check that pairobj is not empty
    // check that password matches hash
    // encrypt secret key.
    // create account object
    // save account object
    // Clear form
    if (this.pairObj.public === '' || this.pairObj.private === '') {
      throw new SazaError('Public or private key not provided.');
    }
    const trimmedPwd = String(this.password.value).trim();
    const passwordHash = await this.userService.getPassword();
    if (!this.utility.validateHash(trimmedPwd, passwordHash)) {
      throw new SazaError(INVALID_PASSWORD_ERROR);
    }

    const encrpytedObject = this.utility.encrypt(
      this.pairObj.private,
      trimmedPwd,
    );

    if (!encrpytedObject) {
      throw new SazaError(ENCRYPTION_FAILED_ERROR);
    }

    const sazaAccount: SazaAccount = {
      public: this.pairObj.public,
      private: encrpytedObject,
      tag: this.utility.validateAccountTag(this.userAccounts, this.tag.value),
    };

    this.userService.setAccount(sazaAccount);
    this.notification.success('Account saved!');
    this.pairObj.private = '';
    this.pairObj.public = '';
    this.keypairGenerated = false;
    this.createAccountForm.reset();
    console.log('account saved');
  }
}
