import { Component, OnInit } from '@angular/core';
import { StellarService, UserService } from 'src/app/providers/providers';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.scss'],
})
export class AccountHistoryComponent implements OnInit {
  accountHistory = [];
  activeAccount: string;

  constructor(private stellarService: StellarService, private userService: UserService) { }

  ngOnInit() {
    this.userService.activeAccount.subscribe((data) => {
      this.activeAccount = data;
      console.log('active account', this.activeAccount);
      this.loadHistory();
    });
  }

  async loadHistory(){
    if (!this.activeAccount) {
      return;
    }
    const data = await this.stellarService.loadOperations(this.activeAccount);
    console.log("data: ", data);
    if (!data) {
      this.accountHistory = [];
      return;
    }
    this.accountHistory = data.records;
  }

}
