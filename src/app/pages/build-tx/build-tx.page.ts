import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  TxService,
  Utility,
  StellarService,
  UserService,
  CustomValidators,
} from '../../providers/providers';
import { Operation, xdr } from 'stellar-sdk';
import { SazaAccount } from 'src/app/interfaces/saza';
import { PickerController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-build-tx',
  templateUrl: './build-tx.page.html',
  styleUrls: ['./build-tx.page.scss'],
})
export class BuildTxPage implements OnInit {
  private buildTxForm: FormGroup;
  networkFees = {
    min_accepted_fee: 100,
    p99_accepted_fee: 200,
  };
  pendingOperations = [];
  activeAccount: string;
  pageTitle = 'Build Transaction';
  helpUrl = '';
  savedMemo = {
    memo: '',
    memo_type: '',
  };
  startDate;
  endDate;
  constructor(
    private formBuilder: FormBuilder,
    private txService: TxService,
    private utility: Utility,
    private stellarService: StellarService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    const today = moment();
    this.startDate = today.toISOString();
    this.endDate = today.add(1, 'd').toISOString();

    this.stellarService
      .fees()
      .then(data => {
        console.log('Fees: ', data);
        const { min_accepted_fee, p99_accepted_fee } = data;
        this.networkFees = {
          min_accepted_fee,
          p99_accepted_fee,
        };
        console.log('NFees: ', this.networkFees);
      })
      .catch(error => console.log(error));

    this.txService.operations.subscribe(data => {
      this.pendingOperations = data;
      console.log('pendingOps', this.pendingOperations);
    });

    this.userService.activeAccount.subscribe(data => {
      this.activeAccount = data;
      console.log('active', this.activeAccount);
    });

    this.txService
      .getMemo()
      .then(data => {
        console.log('memeo: ', data);
        if (data) {
          this.savedMemo = data;
          this.memoValue.patchValue(this.savedMemo.memo);
          this.setMemoType(this.savedMemo.memo_type);
        }
      })
      .catch(error => console.log(error));

    this.makeForm();
  }

  makeForm() {
    this.buildTxForm = this.formBuilder.group({
      fee: [this.networkFees.min_accepted_fee, Validators.required],
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

  viewOperations() {
    this.router.navigate(['operations-queue/']);
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
      // to do check if source is active when building
      const timebounds = {
        minTime: this.minTime.value,
        maxTime: this.maxTime.value,
      };
      if (Number(timebounds.maxTime) < Number(timebounds.minTime)) {
        throw new Error(
          'Timebounds are invalid. Valid until date is befor valid after date',
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
      this.txService.setTx(newTx);

      // to do redirect to signing page
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
