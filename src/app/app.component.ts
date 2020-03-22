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
      icon: 'dashboard',
    },
    {
      title: 'Common Tasks',
      url: '',
      icon: 'list',
      subPages: [
        {
          title: 'Create Account',
          url: '/create-account',
          icon: 'list',
        },
        {
          title: 'Link Account',
          url: '/link-account',
          icon: 'list',
        },
        {
          title: 'Payment',
          url: '/operations/payment',
          icon: 'list',
        },
        {
          title: 'Account Merge',
          url: '/operations/account-merge',
          icon: 'list',
        },
        {
          title: 'Operations Queue',
          url: '/operations-queue',
          icon: 'list',
        },
      ],
    },
    {
      title: 'All Operations',
      url: '',
      icon: 'list',
      subPages: [
        {
          title: 'Create Account',
          url: '/operations/create-account',
          icon: 'list',
        },
        {
          title: 'Payment',
          url: '/operations/payment',
          icon: 'list',
        },
        {
          title: 'Sell Offer',
          url: '/operations/sell-offer',
          icon: 'list',
        },
        {
          title: 'Buy Offer',
          url: '/operations/buy-offer',
          icon: 'list',
        },
        {
          title: 'Passive Offer',
          url: '/operations/passive-offer',
          icon: 'list',
        },
        {
          title: 'Bump Sequence',
          url: '/operations/bump-sequence',
          icon: 'list',
        },
        {
          title: 'Manage Data',
          url: '/operations/manage-data',
          icon: 'list',
        },
        {
          title: 'Account Merge',
          url: '/operations/account-merge',
          icon: 'list',
        },
        {
          title: 'Allow Trust',
          url: '/operations/allow-trust',
          icon: 'list',
        },
        {
          title: 'Change Trust',
          url: '/operations/change-trust',
          icon: 'list',
        },
        {
          title: 'Set Options',
          url: '/operations/set-options',
          icon: 'list',
        },
        {
          title: 'Path Payment Receive',
          url: '/operations/path-receive',
          icon: 'list',
        },
        {
          title: 'Path Payment Send',
          url: '/operations/path-send',
          icon: 'list',
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
          icon: 'cog',
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
