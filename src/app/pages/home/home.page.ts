import { Component } from '@angular/core';
import { UserService } from 'src/app/providers/providers';
import { MenuController } from '@ionic/angular';
import { SazaError } from 'src/app/providers/errors';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userHasPassword = false;
  constructor(private userService: UserService, private menu: MenuController) {}

  ionViewWillEnter() {
    this.menu.enable(false);
    this.userService
      .getPassword()
      .then(password => {
        console.log('pwd: ', password);
        if (password) {
          this.userHasPassword = true;
        }
      })
      .catch(e => {
        console.error(e);
        throw new SazaError('Unable to load user details.');
      });
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }
}
