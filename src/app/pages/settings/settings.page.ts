import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  settings = [
    {
      title: 'Manage Accounts',
      url: '/dashboard',
    },
    {
      title: 'Change Password',
      url: '/dashboard',
    },
    {
      title: 'Logout',
      url: '/dashboard',
    },
  ];
  pageTitle = 'Settings';
  helpUrl = '';

  constructor() { }

  ngOnInit() {
  }

}
