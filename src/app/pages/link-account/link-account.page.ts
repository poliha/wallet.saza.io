import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  Utility,
  UserService,
  CustomValidators,
  INVALID_PASSWORD_ERROR,
  ENCRYPTION_FAILED_ERROR,
  NotificationService,
} from '../../providers/providers';
import { SazaAccount } from '../../interfaces/saza';
import { SazaError } from 'src/app/providers/errors';

@Component({
  selector: 'app-link-account',
  templateUrl: './link-account.page.html',
  styleUrls: ['./link-account.page.scss'],
})
export class LinkAccountPage implements OnInit {
  linkAccountForm: FormGroup;
  userAccounts = [];
  pairObj: { public: string; private: string } = { public: '', private: '' };
  keypairGenerated = false;
  pageTitle = 'Link Account';
  helpUrl = 'https://docs.saza.io/wallet-actions/link-account';
  constructor(
    private formBuilder: FormBuilder,
    private utility: Utility,
    private userService: UserService,
    public notification: NotificationService,
  ) {}

  ngOnInit() {
    this.userService.userAccounts.subscribe(
      (data) => (this.userAccounts = data),
    );
    this.makeForm();
  }

  generateKeypair() {
    const pair = this.utility.keypairFromPrivateKey(this.privateKey.value);
    if (!pair) {
      this.keypairGenerated = false;
      throw new SazaError('Invalid Private Key');
    }
    this.pairObj.public = pair.publicKey();
    this.pairObj.private = pair.secret();
    this.keypairGenerated = true;
  }

  makeForm() {
    this.linkAccountForm = this.formBuilder.group({
      privateKey: [
        '',
        Validators.compose([
          Validators.required,
          CustomValidators.isValidPrivateKey(),
        ]),
      ],
      keysCopied: ['', Validators.requiredTrue],
      password: [
        '',
        Validators.compose([Validators.minLength(8), Validators.required]),
      ],
      tag: [''],
    });
  }

  // Getters for template
  get privateKey() {
    return this.linkAccountForm.get('privateKey');
  }
  get keysCopied() {
    return this.linkAccountForm.get('keysCopied');
  }
  get password() {
    return this.linkAccountForm.get('password');
  }
  get tag() {
    return this.linkAccountForm.get('tag');
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
    this.notification.success('Account linked!');
    this.pairObj.private = '';
    this.pairObj.public = '';
    this.keypairGenerated = false;
    this.linkAccountForm.reset();
  }
}
