import { Component } from '@angular/core';
import { UserService } from 'src/app/providers/providers';
import { MenuController } from '@ionic/angular';
import { SazaError } from 'src/app/providers/errors';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage {
  constructor(private userService: UserService, private menu: MenuController) {}

  ionViewWillEnter() {
    this.userService
      .isAuthValid()
      .then((isValid) => {
        if (!isValid) {
          this.menu.enable(false);
        }
      })
      .catch((e) => {
        throw new SazaError('Unable to load user details.');
      });
  }

  ionViewWillLeave() {
    if (!this.menu.isEnabled()) {
      this.menu.enable(true);
    }
  }
}
