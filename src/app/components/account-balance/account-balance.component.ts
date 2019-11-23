import { Component, OnInit } from '@angular/core';
import { StellarService, UserService } from 'src/app/providers/providers';
import { SazaAccount } from 'src/app/interfaces/saza';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss'],
})
export class AccountBalanceComponent implements OnInit {

  accountBalance = [
    {
      'balance': '0.0000000',
      'limit': '922337203685.4775807',
      'buying_liabilities': '0.0112710',
      'selling_liabilities': '0.0000000',
      'last_modified_ledger': 26878933,
      'is_authorized': true,
      'asset_type': 'credit_alphanum4',
      'asset_code': 'ETH',
      'asset_issuer': 'GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5'
    },
    {
      'balance': '5497.9921391',
      'buying_liabilities': '0.0000000',
      'selling_liabilities': '30.0000000',
      'asset_type': 'native'
    }
  ];

  activeAccount: SazaAccount;

  constructor(private stellarService: StellarService, private userService: UserService) {
   }

  ngOnInit() {
    this.userService.activeAccount.subscribe((data) => {
      this.activeAccount = data;
      console.log('active account', this.activeAccount);
      this.loadAccount();
    });
  }


  async loadAccount() {
    if (!this.activeAccount.public) {
      return;
    }
   const data = await this.stellarService.loadAccount(this.activeAccount.public);
    // const data = await this.stellarService.loadAccount('GBEAVWWISRSMNSUOSZUQ36QNAI7UKWSL62DPVWNGXTWAR2Z6YJGCC3UM');

   console.log("data: ", data);
   console.log("loadAcct");
   this.accountBalance = data.balances;
  }

}
