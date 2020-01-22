import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  TxService,
  Utility,
  StellarService,
  UserService,
} from '../../providers/providers';
import { Operation, xdr } from 'stellar-sdk';
import { SazaAccount } from 'src/app/interfaces/saza';
import { PickerController } from '@ionic/angular';

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
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  multiColumnOptions = [
    ['Minified', 'Responsive', 'Full Stack', 'Mobile First', 'Serverless'],
    ['Tomato', 'Avocado', 'Onion', 'Potato', 'Artichoke'],
    ['Tomato', 'Avocado', 'Onion', 'Potato', 'Artichoke'],
  ];

  constructor(
    private formBuilder: FormBuilder,
    private txService: TxService,
    private utility: Utility,
    private stellarService: StellarService,
    private userService: UserService,
    private pickerCtrl: PickerController,
  ) {}

  ngOnInit() {
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
        }
      })
      .catch(error => console.log(error));

    this.makeForm();
  }

  makeForm() {
    this.buildTxForm = this.formBuilder.group({
      fee: [this.networkFees.min_accepted_fee, Validators.required],
    });
  }

  // Getters for template
  get memo() {
    return this.buildTxForm.get('memo');
  }
  get source() {
    return this.buildTxForm.get('source');
  }
  get fee() {
    return this.buildTxForm.get('fee');
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
      const txOptions = {
        fee: this.fee.value,
        timebounds: {},
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

  async openPicker(numColumns = 1, numOptions = 5, columnOptions = []) {
    const picker = await this.pickerCtrl.create({
      // columns: this.multiColumnOptions,
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: value => {
            console.log(`Got Value: `, value);
          },
        },
      ],
    });

    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions),
      });
    }

    return columns;
  }

  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i,
      });
    }

    return options;
  }
}
