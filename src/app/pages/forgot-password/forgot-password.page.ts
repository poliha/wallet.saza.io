import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'src/app/providers/providers';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  private forgotPasswordForm: FormGroup;
  passwordInputs: FormArray;

  constructor(private menu: MenuController, private formBuilder: FormBuilder) {}

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
    this.forgotPasswordForm = this.formBuilder.group({
      passwords: this.formBuilder.array([]),
    });

    console.log('fgform: ', this.forgotPasswordForm);
    for (let ctr = 0; ctr < 5; ctr++) {
      this.addPasswordInput();
    }
  }

  createPasswordInput() {
    return this.formBuilder.group({
      password: [
        '',
        Validators.compose([Validators.minLength(8), Validators.required]),
      ],
    });
  }

  addPasswordInput() {
    this.passwordInputs = this.forgotPasswordForm.get('passwords') as FormArray;
    this.passwordInputs.push(this.createPasswordInput());
    console.log('form: ', this.forgotPasswordForm);
  }

  get passwords() {
    return this.forgotPasswordForm.get('passwords');
  }

  formSubmit() {
    console.log(this.passwords.value);
  }
}
