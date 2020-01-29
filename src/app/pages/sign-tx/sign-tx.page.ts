import { Component, OnInit } from '@angular/core';
import {
  TxService,
  Utility,
  StellarService,
  UserService,
  CustomValidators,
  INVALID_PASSWORD_ERROR,
  NotificationService,
} from '../../providers/providers';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Operation, xdr, Transaction } from 'stellar-sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-tx',
  templateUrl: './sign-tx.page.html',
  styleUrls: ['./sign-tx.page.scss'],
})
export class SignTxPage implements OnInit {
  builtTx = '';
  signTxForm: FormGroup;
  privateKeyInputs: FormArray;
  privateKeyLabels = [];
  eligibleSigners: Set<any>;
  userAccounts = [];
  pageTitle = 'Sign Transaction';
  helpUrl = '';
  txDetail: any;
  constructor(
    private formBuilder: FormBuilder,
    private txService: TxService,
    private utility: Utility,
    private stellarService: StellarService,
    private userService: UserService,
    private notify: NotificationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.makeForm();
    this.userService.userAccounts.subscribe(data => (this.userAccounts = data));
    this.txService.tx.subscribe(data => {
      if (data) {
        this.builtTx = data;
        console.log('builtTx: ', this.builtTx);
        this.txDetail = this.stellarService.loadTransactionObject(this.builtTx);
        console.log('txDetail: ', this.txDetail);
        this.loadEligibleSigners();
        // const txObj = new Transaction(this.builtTx);
        // console.log('txObj: ', txObj);
        // const txSources = this.stellarService.txSourceAccounts(this.builtTx);
        // console.log('srcAccounts: ', txSources);
      }
    });
  }

  makeForm() {
    this.signTxForm = this.formBuilder.group({
      password: [''],
      privateKeys: this.formBuilder.array([]),
    });
    console.log('form: ', this.signTxForm);
  }

  loadEligibleSigners() {
    this.stellarService
      .txSigners(this.builtTx)
      .then(eligibleSigners => {
        console.log('el: ', eligibleSigners);
        this.eligibleSigners = eligibleSigners;
        eligibleSigners.forEach((signer: string) => {
          if (!this.userAccounts.find(acc => acc.public === signer)) {
            this.addPrivateKeyInput(signer);
          }
        });
      })
      .catch(err => {
        // to do handle error.
        console.log(err);
      });
  }

  createPrivateKeyInput() {
    return this.formBuilder.group({
      privateKey: [
        '',
        Validators.compose([CustomValidators.isValidPrivateKey()]),
      ],
    });
  }

  addPrivateKeyInput(label = 'Private Key') {
    this.privateKeyLabels.push(label);
    this.privateKeyInputs = this.signTxForm.get('privateKeys') as FormArray;
    this.privateKeyInputs.push(this.createPrivateKeyInput());
    console.log('form: ', this.signTxForm);
  }

  removePrivateKeyInput(index) {
    this.privateKeyInputs.controls.splice(index, 1);
    this.privateKeyLabels.splice(index, 1);
  }

  viewOperations() {
    this.router.navigate(['operations-queue/']);
  }

  // Getters for template
  get password() {
    return this.signTxForm.get('password');
  }
  get privateKeys() {
    return this.signTxForm.get('privateKeys');
  }

  async signTransaction() {
    const trimmedPwd = String(this.password.value).trim();
    const privateKeys = this.privateKeys.value;

    const passwordHash = await this.userService.getPassword();
    if (!this.utility.validateHash(trimmedPwd, passwordHash)) {
      throw new Error(INVALID_PASSWORD_ERROR);
    }

    this.userAccounts
      .filter(acc => {
        return this.eligibleSigners.has(acc.public);
      })
      .forEach(acc => {
        const decryptedKey = this.utility.decrypt(acc.private, trimmedPwd);
        privateKeys.push(decryptedKey);
      });

    const signedTx = this.stellarService.signTx(this.builtTx, ...privateKeys);
    const submitTx = await this.stellarService.submitTx(signedTx);
    console.log('submitTx: ', submitTx);
    // to do clear built tx and ops
    // show success or error
    // redirect user
  }
}
