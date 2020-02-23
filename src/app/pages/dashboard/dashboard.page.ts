import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/providers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  numberOfAccounts = 0;
  showAccountPicker = true;
  constructor(private userService: UserService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.userService.getAccounts().then(data => {
      if (Array.isArray(data)) {
        this.numberOfAccounts = data.length;
      }
    });
  }
}
