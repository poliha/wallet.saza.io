import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './providers/providers';

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
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setNetwork(event){
    if (event.target.checked) {
      this.userService.setActiveNetwork('testnet');
    } else {
      this.userService.setActiveNetwork('pubnet');
    }
  }
}
