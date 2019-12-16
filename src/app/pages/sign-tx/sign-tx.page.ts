import { Component, OnInit } from '@angular/core';
import { TxService, Utility, StellarService, UserService, CustomValidators } from '../../providers/providers';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Operation, xdr, Transaction } from 'stellar-sdk';



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
  constructor(private formBuilder: FormBuilder, private txService: TxService,
    private utility: Utility, private stellarService: StellarService, private userService: UserService) { }

  ngOnInit() {
    this.makeForm();
    this.txService.tx.subscribe((data) => {
      this.builtTx = data;
      console.log('builtTx: ', this.builtTx);
      if(this.builtTx){
        const txObj = new Transaction(this.builtTx);
        console.log('txObj: ', txObj);
        const txSources = this.stellarService.txSourceAccounts(this.builtTx);
        console.log('srcAccounts: ', txSources);
        this.stellarService.txSigners(this.builtTx).then(eligibleSigners =>{
          console.log('el: ', eligibleSigners);
          eligibleSigners.forEach((element: string) => {
            this.addPrivateKeyInput(element);
          });
        }).catch(err => console.log(err));

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

  createPrivateKeyInput() {
    return this.formBuilder.group({
      privateKey: ['', Validators.compose([CustomValidators.isValidPrivateKey()])]
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
  get password() { return this.signTxForm.get('password'); }
  get privateKeys() { return this.signTxForm.get('privateKeys'); }

  // Build transaction
  // add all operations
  // add memo
  // specify fee
  // specify tx timeout
  // Display transaction details - ops, hash, fee
  // determine required sigs
  // sign tx
  // send tx

}
