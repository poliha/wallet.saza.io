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
      url: '/manage-accounts',
    },
    {
      title: 'Change Password',
      url: '/change-password',
    },
    {
      title: 'Export Accounts',
      url: '/export-account',
    },
    {
      title: 'Import Accounts',
      url: '#',
    },
  ];
  pageTitle = 'Settings';
  helpUrl = '';

  constructor() {}

  ngOnInit() {}
}
