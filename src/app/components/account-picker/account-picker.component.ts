import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../providers/providers';
import { SazaAccount } from '../../interfaces/saza';
@Component({
  selector: 'app-account-picker',
  templateUrl: './account-picker.component.html',
  styleUrls: ['./account-picker.component.scss'],
})
export class AccountPickerComponent implements OnInit {
  public userAccounts: SazaAccount[] = [];
  public activeAccount = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadAccount();
  }

  loadAccount() {
    this.userAccounts = this.userService.userAccounts.getValue();
    this.userService.activeAccount.subscribe((activeAccount) => {
      // default to the first account if available
      if (!activeAccount && this.userAccounts.length) {
        this.activeAccount = this.userAccounts[0].public;
        this.userService.setActiveAccount(this.activeAccount);
      } else {
        this.activeAccount = activeAccount;
      }
    });
  }

  accountChanged(event) {
    console.log('accountChanged: ', event.target.value);
    this.userService.setActiveAccount(event.target.value);
  }
}
