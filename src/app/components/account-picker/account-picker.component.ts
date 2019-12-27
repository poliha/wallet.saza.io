import { Component, OnInit } from '@angular/core';
import { UserService } from '../../providers/providers';
import { SazaAccount } from '../../interfaces/saza';
@Component({
  selector: 'app-account-picker',
  templateUrl: './account-picker.component.html',
  styleUrls: ['./account-picker.component.scss'],
})
export class AccountPickerComponent implements OnInit {

  constructor(private userService: UserService) { }

  public userAccounts: SazaAccount[];
  public activeAccount: string;


  compareWith = (o1, o2) => {
    return o1 && o2 ? o1.public === o2.public : o1 === o2;
  }

  ngOnInit() {
    this.userService.userAccounts.subscribe((data) => {
      this.userAccounts = data;
      console.log('accountPicker', this.userAccounts);
    });
    this.userService.activeAccount.subscribe((data) => {
      this.activeAccount = data;
      console.log('active account', this.activeAccount);
    });
  }

  accountChanged(event){
    console.log("a: ", event.target.value)
    this.userService.setActiveAccount(event.target.value);
  }
}
