import { Component, OnInit } from '@angular/core';
import {
  TxService,
  Utility,
  StellarService,
  UserService,
  CustomValidators,
  INVALID_PASSWORD_ERROR,
  NotificationService,
  LoadingService,
} from '../../providers/providers';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { SazaError, TransactionErrors } from 'src/app/providers/errors';

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
  helpUrl = 'https://docs.saza.io/wallet-actions/sign-transaction';
  txDetail: any;
  constructor(
    private formBuilder: FormBuilder,
    private txService: TxService,
    private utility: Utility,
    private stellarService: StellarService,
    private userService: UserService,
    private notify: NotificationService,
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.makeForm();
    this.userService.userAccounts.subscribe(
      (data) => (this.userAccounts = data),
    );
  }

  ionViewWillEnter() {
    this.txService
      .getTx()
      .then((builtTx) => {
        if (!builtTx) {
          this.notify.info(
            'No transaction to sign. Please create an operation.',
          );
          return this.router.navigate(['dashboard']);
        }
        this.builtTx = builtTx;
        console.log('builtTx: ', this.builtTx);
        this.txDetail = this.stellarService.loadTransactionObject(this.builtTx);
        console.log('txDetail: ', this.txDetail);
        this.loadEligibleSigners();
      })
      .catch((error) => {
        console.log(error);
        throw new SazaError(
          'Unable to complete task: load transaction for signing. Please try again.',
        );
      });
  }

  makeForm() {
    this.signTxForm = this.formBuilder.group({
      password: [
        '',
        Validators.compose([Validators.minLength(8), Validators.required]),
      ],
      privateKeys: this.formBuilder.array([]),
    });
    console.log('form: ', this.signTxForm);
  }

  loadEligibleSigners() {
    this.stellarService
      .txSigners(this.builtTx)
      .then((eligibleSigners) => {
        console.log('el: ', eligibleSigners);
        this.eligibleSigners = eligibleSigners;
        eligibleSigners.forEach((signer: string) => {
          if (!this.userAccounts.find((acc) => acc.public === signer)) {
            this.addPrivateKeyInput(signer);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        throw new SazaError('Unable to determine signers.');
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

  // Getters for template
  get password() {
    return this.signTxForm.get('password');
  }
  get privateKeys() {
    return <FormArray>this.signTxForm.get('privateKeys');
  }

  async signTransaction() {
    try {
      await this.loadingService.start();
      const trimmedPwd = String(this.password.value).trim();
      const privateKeys = [
        ...this.privateKeys.value
          .map((key) => key.privateKey)
          .filter((key) => Boolean(key)),
      ];

      const passwordHash = await this.userService.getPassword();
      if (!this.utility.validateHash(trimmedPwd, passwordHash)) {
        throw new SazaError(INVALID_PASSWORD_ERROR);
      }

      this.userAccounts
        .filter((acc) => {
          return this.eligibleSigners.has(acc.public);
        })
        .forEach((acc) => {
          const decryptedKey = this.utility.decrypt(acc.private, trimmedPwd);
          privateKeys.push(decryptedKey);
        });

      const signedTx = this.stellarService.signTx(this.builtTx, ...privateKeys);
      console.log('signedTx: ', signedTx);
      const submitTx = await this.stellarService.submitTx(signedTx);
      console.log('submitTx: ', submitTx);

      this.signTxForm.reset();
      await this.txService.deleteAllOperations();
      await this.txService.deleteTx();
      await this.notify.success('Transaction submitted.');

      return this.router.navigate(['dashboard']);
    } catch (error) {
      if (!error.response) {
        throw error;
      } else {
        console.log('handle submit errors');

        console.log(Object.keys(error.response));

        const {
          data: {
            extras: {
              result_codes: { transaction, operations },
            },
          },
        } = error.response;
        console.log('Error extras: ', transaction, operations);

        const errorMessages = [];
        if (!transaction) {
          errorMessages.push('Transaction Error');
        } else {
          errorMessages.push(TransactionErrors.transaction[transaction]);
        }

        if (operations) {
          const { operations: submittedOperations } = this.txDetail;
          operations.forEach((value, key) => {
            console.log(`${key}:${value}`);
            if (value !== 'op_success') {
              const opType = submittedOperations[key].type;
              console.log(`opType: ${opType}:${value}`);

              const opError =
                TransactionErrors[opType][String(value).toUpperCase()];
              errorMessages.push(`${opType}: ${opError}`);
            }
          });
        }
        throw new SazaError(errorMessages.join('\n'));
      }
    } finally {
      await this.loadingService.stop();
    }
  }
}
