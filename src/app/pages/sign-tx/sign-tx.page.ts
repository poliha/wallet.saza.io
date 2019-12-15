import { Component, OnInit } from '@angular/core';
import { TxService, Utility, StellarService, UserService } from '../../providers/providers';
import { FormBuilder } from '@angular/forms';
import { Operation, xdr, Transaction } from 'stellar-sdk';



@Component({
  selector: 'app-sign-tx',
  templateUrl: './sign-tx.page.html',
  styleUrls: ['./sign-tx.page.scss'],
})
export class SignTxPage implements OnInit {

  builtTx = '';

  constructor(private formBuilder: FormBuilder, private txService: TxService,
    private utility: Utility, private stellarService: StellarService, private userService: UserService) { }

  ngOnInit() {
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
        }).catch(err => console.log(err));

      }
    });

  }

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
