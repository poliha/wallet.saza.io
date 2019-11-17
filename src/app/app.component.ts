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
