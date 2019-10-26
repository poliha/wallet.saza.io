import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Utility, UserService, INVALID_PASSWORD_ERROR } from '../../providers/providers';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private utility: Utility,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.makeForm();
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
    this.userService.login();
    this.router.navigate(['create-account/']);
  }

}
