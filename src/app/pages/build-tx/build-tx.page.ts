import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TxService, Utility, StellarService } from '../../providers/providers';
import { Operation, xdr } from 'stellar-sdk';

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
  pendingOperations = []
  constructor(private formBuilder: FormBuilder, private txService: TxService,
    private utility: Utility, private stellarService: StellarService) { }

  ngOnInit() {
    this.stellarService.fees().then(data => {
      console.log('Fees: ', data);
      const { min_accepted_fee, p99_accepted_fee } = data;
      this.networkFees = {
        min_accepted_fee,
        p99_accepted_fee
      };
      console.log('NFees: ', this.networkFees);

    })
    .catch(error => console.log(error));
    this.txService.operations.subscribe((data) => {
      this.pendingOperations = data;
      console.log('pendingOps', this.pendingOperations);
    });
    this.makeForm();
  }

  makeForm() {
    this.buildTxForm = this.formBuilder.group({
      fee: [0, Validators.required],

    });
  }

  // Getters for template
  get memo() { return this.buildTxForm.get('memo'); }
  get source() { return this.buildTxForm.get('source'); }
  get fee() { return this.buildTxForm.get('fee'); }


  buildTransaction() {
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
        fee: '',
        timebounds: {},
        memo: {},
        networkPassphrase: '',
        operations: this.pendingOperations
      }

    } catch (error) {
      console.log('error: ', error)
    }
  }
}
