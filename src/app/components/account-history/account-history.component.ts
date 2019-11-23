import { Component, OnInit } from '@angular/core';
import { StellarService, UserService } from 'src/app/providers/providers';
import { SazaAccount } from 'src/app/interfaces/saza';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.scss'],
})
export class AccountHistoryComponent implements OnInit {
  accountHistory = [];
  activeAccount: SazaAccount;

  constructor(private stellarService: StellarService, private userService: UserService) { }

  ngOnInit() {
    this.userService.activeAccount.subscribe((data) => {
      this.activeAccount = data;
      console.log('active account', this.activeAccount);
      this.loadHistory();
    });
  }

  async loadHistory(){
    if (!this.activeAccount.public) {
      return;
    }
    const data = await this.stellarService.loadOperations(this.activeAccount.public);

    console.log("data: ", data);
    console.log("loadAcct");
    this.accountHistory = data.records;
  }

}
