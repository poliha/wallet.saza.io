import { Component, OnInit } from '@angular/core';
import {
  StellarService,
  UserService,
  LoadingService,
} from 'src/app/providers/providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.scss'],
})
export class AccountHistoryComponent implements OnInit {
  accountHistory = [];
  activeAccount: string;
  nextPage;

  constructor(
    private stellarService: StellarService,
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.userService.activeAccount.subscribe(data => {
      this.activeAccount = data;
      console.log('active account', this.activeAccount);
      this.loadHistory();
    });
  }

  async loadHistory() {
    try {
      if (!this.activeAccount) {
        return;
      }

      await this.loadingService.start();

      this.accountHistory = [];
      const data = await this.stellarService.loadOperations(this.activeAccount);
      console.log('data: ', data);
      if (!data) {
        return;
      }
      const { next, records } = data;
      this.accountHistory = records;
      this.nextPage = next;
    } catch (error) {
      throw error;
    } finally {
      await this.loadingService.stop();
    }
  }

  async viewHistoryDetail(data) {
    // save in storage
    // navigate to  account-history-detail page
    console.log(data);
    await this.userService.setAccountHistory(JSON.stringify(data));
    this.router.navigate(['account-history-detail/']);
  }

  async loadMore() {
    try {
      await this.loadingService.start();

      const resp = await this.nextPage();
      if (!resp) {
        return;
      }
      console.log('more: ', resp);
      const { next, records } = resp;
      this.accountHistory.push(...records);
      this.nextPage = next;
    } catch (error) {
      throw error;
    } finally {
      await this.loadingService.stop();
    }
  }
}
