import { Component, OnInit } from '@angular/core';
import { StellarService, UserService } from 'src/app/providers/providers';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss'],
})
export class AccountBalanceComponent implements OnInit {
  accountBalance = [];

  activeAccount: string;

  constructor(
    private stellarService: StellarService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.activeAccount.subscribe(data => {
      this.activeAccount = data;
      console.log('active account', this.activeAccount);
      this.loadAccount();
    });
  }

  async loadAccount() {
    if (!this.activeAccount) {
      return;
    }
    this.accountBalance = [];
    const data = await this.stellarService.loadAccount(this.activeAccount);
    console.log('data: ', data);
    if (!data) {
      return;
    }
    this.accountBalance = data.balances.reverse();
  }
}
