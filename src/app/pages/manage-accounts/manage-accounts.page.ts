import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/providers';
import { SazaAccount } from 'src/app/interfaces/saza';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.page.html',
  styleUrls: ['./manage-accounts.page.scss'],
})
export class ManageAccountsPage implements OnInit {
  pageTitle = 'Manage Accounts';
  helpUrl = '';
  userAccounts: SazaAccount[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userAccounts.subscribe(data => {
      this.userAccounts = data;
      console.log('manage accounts', this.userAccounts);
    });
  }
}
