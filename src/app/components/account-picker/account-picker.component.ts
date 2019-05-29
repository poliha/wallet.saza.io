import { Component, OnInit } from '@angular/core';
import { UserService } from '../../providers/providers';
import { SazaAccount } from '../../interfaces/saza';
@Component({
  selector: 'app-account-picker',
  templateUrl: './account-picker.component.html',
  styleUrls: ['./account-picker.component.scss'],
})
export class AccountPickerComponent implements OnInit {

  public userAccounts: SazaAccount[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userAccounts.subscribe((data) => {
      this.userAccounts = data;
      console.log('accountPicker', this.userAccounts);

    });
  }

  compareWithFn = (o1, o2) =>{
    return o1 && o2 ? o1.public === o2.public : o1 === o2;
  };

  compareWith = this.compareWithFn;

  accountChanged(event){
    console.log("a: ", event.target.value)
    this.userService.setActiveAccount(event.target.value);
  }

  


}
