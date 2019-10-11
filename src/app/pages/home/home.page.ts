import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/providers';
import { isNull } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userHasPassword = false;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getPassword().then((pwd) => {
      if (pwd !== null || pwd !== undefined) {
        this.userHasPassword = true;
      }
    }).catch((e) => {
      console.error(e);
    });
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
