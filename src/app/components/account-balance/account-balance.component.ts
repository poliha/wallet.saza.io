import { Component, OnInit } from '@angular/core';
import { StellarService } from 'src/app/providers/providers';

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

  constructor(private stellarService: StellarService) { }

  ngOnInit() {
    this.loadAccount();
  }


  async loadAccount() {
   const data = await this.stellarService.loadAccount('GAQHWQYBBW272OOXNQMMLCA5WY2XAZPODGB7Q3S5OKKIXVESKO55ZQ7C');
    // const data = await this.stellarService.loadAccount('GBEAVWWISRSMNSUOSZUQ36QNAI7UKWSL62DPVWNGXTWAR2Z6YJGCC3UM');

   console.log("data: ", data);
   console.log("loadAcct");
   this.accountBalance = data.balances;
  }

}
