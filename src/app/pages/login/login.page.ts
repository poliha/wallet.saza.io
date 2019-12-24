import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Utility, UserService, INVALID_PASSWORD_ERROR, NotificationService } from '../../providers/providers';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private utility: Utility,
    private userService: UserService, private router: Router,
    private notification: NotificationService, private menu: MenuController) { }

  ngOnInit() {
    this.makeForm();
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  makeForm() {
    this.loginForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
    });
  }

  get password() { return this.loginForm.get('password'); }

  async formSubmit() {
    // validate password
    // redirect to dashboard
    const passwordHash = await this.userService.getPassword();
    if (!this.utility.validateHash(this.password.value, passwordHash)) {
      throw new Error(INVALID_PASSWORD_ERROR);
    }
    this.notification.show('Login success');
    this.userService.login();
    this.router.navigate(['dashboard/']);
  }
}
