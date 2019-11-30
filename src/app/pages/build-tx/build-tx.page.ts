import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TxService, CustomValidators, Utility } from '../../providers/providers';
import { Operation, xdr } from 'stellar-sdk';

@Component({
  selector: 'app-build-tx',
  templateUrl: './build-tx.page.html',
  styleUrls: ['./build-tx.page.scss'],
})
export class BuildTxPage implements OnInit {
  private buildTxForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private txService: TxService,
    private utility: Utility) { }

  ngOnInit() {
    this.makeForm();
  }

  makeForm() {
    this.buildTxForm = this.formBuilder.group({});
  }

  // Getters for template
  get memo() { return this.buildTxForm.get('memo'); }


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

    } catch (error) {
      console.log('error: ', error)
    }
  }
}
