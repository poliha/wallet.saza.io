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
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.userService.getAccounts().then(data => {
      if (!Array.isArray(data) || !data.length) {
        return this.router.navigate(['/dashboard']);
      }
      this.userAccounts = data;
    });
  }
}
