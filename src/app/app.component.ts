import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './providers/providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Build Tx',
      url: '/build-tx',
      icon: 'cog'
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Saza Setup',
      url: '/saza-setup',
      icon: 'list'
    },
    {
      title: 'Create Account',
      url: '/create-account',
      icon: 'list'
    },
    {
      title: 'Link Account',
      url: '/link-account',
      icon: 'list'
    },
    {
      title: 'Ops Create Account',
      url: '/operations/create-account',
      icon: 'list'
    },
    {
      title: 'Ops Payment',
      url: '/operations/payment',
      icon: 'list'
    },
    {
      title: 'Ops Sell Offer',
      url: '/operations/sell-offer',
      icon: 'list'
    },
    {
      title: 'Ops Buy Offer',
      url: '/operations/buy-offer',
      icon: 'list'
    },
    {
      title: 'Ops Passive Offer',
      url: '/operations/passive-offer',
      icon: 'list'
    },
    {
      title: 'Ops  bump Sequence',
      url: '/operations/bump-sequence',
      icon: 'list'
    },
    {
      title: 'Ops manage data',
      url: '/operations/manage-data',
      icon: 'list'
    },
    {
      title: 'Ops account merge',
      url: '/operations/account-merge',
      icon: 'list'
    },
    {
      title: 'Ops allow trust',
      url: '/operations/allow-trust',
      icon: 'list'
    },
    {
      title: 'Ops change trust',
      url: '/operations/change-trust',
      icon: 'list'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/']);
  }
  setNetwork(event){
    if (event.target.checked) {
      this.userService.setActiveNetwork('testnet');
    } else {
      this.userService.setActiveNetwork('pubnet');
    }
  }
}
