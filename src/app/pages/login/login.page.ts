import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  Utility,
  UserService,
  INVALID_PASSWORD_ERROR,
  NotificationService,
} from '../../providers/providers';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SazaError } from 'src/app/providers/errors';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  pageTitle = 'Login';
  subTitle = '';
  helpUrl = '#';
  constructor(
    public formBuilder: FormBuilder,
    public utility: Utility,
    public userService: UserService,
    public router: Router,
    public notification: NotificationService,
    public menu: MenuController,
  ) {}

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
      password: [
        '',
        Validators.compose([Validators.minLength(8), Validators.required]),
      ],
    });
  }

  get password() {
    return this.loginForm.get('password');
  }

  async formSubmit() {
    // validate password
    // redirect to dashboard
    const passwordHash = await this.userService.getPassword();
    const trimmedPwd = String(this.password.value).trim();
    if (!this.utility.validateHash(trimmedPwd, passwordHash)) {
      throw new SazaError(INVALID_PASSWORD_ERROR);
    }
    this.loginForm.reset();
    this.notification.success('Login success');
    this.userService.login();
    this.router.navigate(['dashboard/']);
  }
}
