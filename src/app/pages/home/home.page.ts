import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/providers';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userHasPassword = false;
  constructor(private router: Router, private userService: UserService, private menu: MenuController) { }

  ngOnInit() {
    this.userService.getPassword().then((pwd) => {
      console.log("pwd: ", pwd)
      if (pwd !== null && pwd !== undefined) {
        this.userHasPassword = true;
      }
    }).catch((e) => {
      console.error(e);
      throw new Error('Unable to load user details.');
      
    });

    // disable menu for this page
    // to do: disable menu based on login status.
    this.menu.enable(false);
  }

  /**
   * Navigate to setup page
   */
  sazaSetup() {
    this.router.navigate(['saza-setup/']);
  }

  /**
   * Navigate to login page
   */
  login() {
    this.router.navigate(['login/']);
  }
}
