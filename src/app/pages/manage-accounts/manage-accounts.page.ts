import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/providers';
import { SazaAccount } from 'src/app/interfaces/saza';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.page.html',
  styleUrls: ['./manage-accounts.page.scss'],
})
export class ManageAccountsPage implements OnInit {
  pageTitle = 'Manage Accounts';
  helpUrl = '';
  userAccounts: SazaAccount[] = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.userAccounts.subscribe((data) => {
      this.userAccounts = data;
      console.log('manage accounts', this.userAccounts);
    });
  }

  createAccount() {
    this.router.navigate(['create-account/']);
  }

  linkAccount() {
    this.router.navigate(['link-account/']);
  }


}
