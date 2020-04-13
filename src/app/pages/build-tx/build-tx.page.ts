import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  TxService,
  StellarService,
  UserService,
  CustomValidators,
  LoadingService,
} from '../../providers/providers';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SazaError } from 'src/app/providers/errors';

@Component({
  selector: 'app-build-tx',
  templateUrl: './build-tx.page.html',
  styleUrls: ['./build-tx.page.scss'],
})
export class BuildTxPage implements OnInit {
  buildTxForm: FormGroup;
  networkFees = {
    minFee: 100,
    maxFee: 200,
  };
  pendingOperations = [];
  activeAccount: string;
  pageTitle = 'Build Transaction';
  helpUrl = '#';
  savedMemo = {
    memo: '',
    memo_type: '',
  };
  startDate;
  endDate;
  constructor(
    private formBuilder: FormBuilder,
    private txService: TxService,
    private stellarService: StellarService,
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.makeForm();
    // Get the active account. Used as the default transaction source.
    this.userService.activeAccount.subscribe((data) => {
      this.activeAccount = data;
      console.log('active', this.activeAccount);
    });
  }

  ionViewWillEnter() {
    // set start date and end date for timebounds.
    const today = moment();
    this.startDate = today.toISOString();
    this.endDate = today.add(1, 'd').toISOString();

    // get most recent network fees.
    this.stellarService
      .fees()
      .then((data) => {
        console.log('Fees: ', data);
        const { fee_charged, max_fee } = data;
        this.networkFees = {
          minFee: fee_charged.min,
          maxFee: max_fee.p99,
        };
        console.log('NFees: ', this.networkFees);
      })
      .catch((error) => console.log(error));

    // get pending operations list
    this.txService.operations.subscribe((data) => {
      this.pendingOperations = data;
      console.log('pendingOps', this.pendingOperations);
    });

    // If any, used saved memo. E.g. from a federation request.
    this.txService
      .getMemo()
      .then((data) => {
        console.log('memeo: ', data);
        if (data) {
          this.savedMemo = data;
          this.memoValue.patchValue(this.savedMemo.memo);
          this.setMemoType(this.savedMemo.memo_type);
        }
      })
      .catch((error) => console.log(error));
  }

  makeForm() {
    this.buildTxForm = this.formBuilder.group({
      fee: [this.networkFees.minFee, Validators.required],
      memo: this.formBuilder.group(
        {
          memoValue: [],
          memoType: [],
        },
        { validators: CustomValidators.isValidMemo },
      ),
    });
  }

  // Getters for template
  get memo() {
    return this.buildTxForm.get('memo');
  }
  get memoType() {
    return this.memo.get('memoType');
  }
  get memoValue() {
    return this.memo.get('memoValue');
  }
  get source() {
    return this.buildTxForm.get('source');
  }
  get fee() {
    return this.buildTxForm.get('fee');
  }
  get minTime() {
    return this.buildTxForm.get('minTime');
  }
  get maxTime() {
    return this.buildTxForm.get('maxTime');
  }

  memoChanged(event) {
    this.setMemoType(event.target.value);
  }

  setMemoType(value) {
    if (!value) {
      return;
    }
    this.memoType.patchValue(value);
  }

  async buildTransaction() {
    // load source account details from horizon
    // use loaded account to start transaction builder process
    // get all saved operations
    // add saved operations to tx, add memo, etc
    // build tx and convert to xdr
    // save xdr string to be used later in signing and sending the transaction
    // reset form
    // Show success or error message

    try {
      await this.loadingService.start();
      const timebounds = {
        minTime: Number(this.minTime.value),
        maxTime: Number(this.maxTime.value),
      };
      console.log('timebounds: ', timebounds);
      if (timebounds.maxTime < timebounds.minTime) {
        throw new SazaError(
          'Timebounds are invalid. "valid until" date is before "valid from" date',
        );
      }

      const txOptions = {
        fee: this.fee.value,
        timebounds,
        memo: this.memo.value,
        operations: this.pendingOperations,
        source: this.source.value,
      };

      console.log('txOptions: ', txOptions);

      const newTx = await this.stellarService.buildTransaction(txOptions);
      console.log('newTx', newTx);
      await this.txService.setTx(newTx);
      this.buildTxForm.reset();
      this.router.navigate(['sign-tx/']);
    } catch (error) {
      console.log('error: ', error);
      throw error;
    } finally {
      await this.loadingService.stop();
    }
  }
}
