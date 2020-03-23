import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './providers/providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public appPages = [
    {
      title: 'My Accounts',
      url: '/dashboard',
      icon: '',
    },
    {
      title: 'Common Tasks',
      url: '',
      icon: 'list',
      subPages: [
        {
          title: 'Create Account',
          url: '/create-account',
          icon: '',
        },
        {
          title: 'Link Account',
          url: '/link-account',
          icon: '',
        },
        {
          title: 'Payment',
          url: '/operations/payment',
          icon: '',
        },
        {
          title: 'Account Merge',
          url: '/operations/account-merge',
          icon: '',
        },
        {
          title: 'Operations Queue',
          url: '/operations-queue',
          icon: '',
        },
      ],
    },
    {
      title: 'All Operations',
      url: '',
      icon: 'list',
      subPages: [
        {
          title: 'Account Merge',
          url: '/operations/account-merge',
          icon: '',
        },
        {
          title: 'Allow Trust',
          url: '/operations/allow-trust',
          icon: '',
        },
        {
          title: 'Change Trust',
          url: '/operations/change-trust',
          icon: '',
        },
        {
          title: 'Create Account',
          url: '/operations/create-account',
          icon: '',
        },
        {
          title: 'Bump Sequence',
          url: '/operations/bump-sequence',
          icon: '',
        },
        {
          title: 'Buy Offer',
          url: '/operations/buy-offer',
          icon: '',
        },
        {
          title: 'Manage Data',
          url: '/operations/manage-data',
          icon: '',
        },
        {
          title: 'Passive Offer',
          url: '/operations/passive-offer',
          icon: '',
        },
        {
          title: 'Path Payment Receive',
          url: '/operations/path-receive',
          icon: '',
        },
        {
          title: 'Path Payment Send',
          url: '/operations/path-send',
          icon: '',
        },
        {
          title: 'Payment',
          url: '/operations/payment',
          icon: '',
        },
        {
          title: 'Sell Offer',
          url: '/operations/sell-offer',
          icon: '',
        },
        {
          title: 'Set Options',
          url: '/operations/set-options',
          icon: '',
        },
      ],
    },
    {
      title: 'Management',
      url: '',
      icon: 'list',
      subPages: [
        {
          title: 'Settings',
          url: '/settings',
          icon: '',
        },
      ],
    },
  ];

  public activeNetwork: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.userService.activeNetwork.subscribe(data => {
        this.activeNetwork = data;
      });
    });

    this.platform.resume.subscribe(async () => {
      const isAuthValid = await this.userService.isAuthValid();
      console.log('isAuthValid: ', isAuthValid);
      if (!isAuthValid) {
        this.userService.logout();
      }
    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  setNetwork(event) {
    const network = event.target.value;
    this.userService.setActiveNetwork(network);
  }
}
