import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  CustomValidators,
  Utility,
  UserService,
  NotificationService,
} from '../../providers/providers';
import { ModalController, MenuController } from '@ionic/angular';
import { RecoveryPasswordModalComponent } from '../../components/recovery-password-modal/recovery-password-modal.component';
import { OverlayEventDetail } from '@ionic/core';
import { Router } from '@angular/router';
import { SazaError } from 'src/app/providers/errors';

@Component({
  selector: 'app-saza-setup',
  templateUrl: './saza-setup.page.html',
  styleUrls: ['./saza-setup.page.scss'],
})
export class SazaSetupPage implements OnInit {
  passwordForm: FormGroup;
  pageTitle = 'Setup Wallet';
  helpUrl = 'https://docs.saza.io/getting-started/setup-wallet';
  constructor(
    private formBuilder: FormBuilder,
    private utility: Utility,
    private userService: UserService,
    private menu: MenuController,
    public modalController: ModalController,
    private router: Router,
    public notification: NotificationService,
  ) {}

  ngOnInit() {
    this.makeForm();
  }

  ionViewWillEnter() {
    this.userService.getPassword().then((password) => {
      if (!password) {
        this.menu.enable(false);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  makeForm() {
    this.passwordForm = this.formBuilder.group({
      password: [
        '',
        Validators.compose([
          Validators.minLength(8),
          Validators.required,
          CustomValidators.isValidPassword(),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.minLength(8),
          Validators.required,
          CustomValidators.isValidPassword(),
          CustomValidators.equalTo('password'),
        ]),
      ],
    });
  }

  // Getters for template
  get password() {
    return this.passwordForm.get('password');
  }
  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  async setupWallet() {
    // check that passwords match
    // get hash of password
    // generate recovery password
    // use recovery password to encrypt main password
    // save hash of password
    // save encrypted password
    // return recovery password to user in plain text
    if (this.password.value !== this.confirmPassword.value) {
      throw new SazaError('Password mismatch');
    }
    const trimmedPwd = String(this.password.value).trim();
    const passwordHash = this.utility.getHash(trimmedPwd);
    const recoveryPassword = this.utility.generatePassword();

    // use the recovery password to encrypt the primary password.
    const encrpytedPassword = this.utility.encrypt(
      trimmedPwd,
      recoveryPassword,
    );
    console.log('PE: ', encrpytedPassword);
    console.log('PH: ', passwordHash);
    console.log('PR: ', recoveryPassword);
    // save hash of primary password
    await this.userService.setPassword(passwordHash);
    // save encrypted password
    await this.userService.setPasswordRecovery(encrpytedPassword);
    // display recovery password to user
    await this.presentModal(recoveryPassword);
  }

  async presentModal(modalValue) {
    const modal = await this.modalController.create({
      component: RecoveryPasswordModalComponent,
      componentProps: { recoveryPassword: modalValue },
      backdropDismiss: false,
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      console.log('modal dismissed');
      this.router.navigate(['login/']);
    });

    return await modal.present();
  }

  async canDeactivate(nextUrl: string) {
    let status = false;
    if (nextUrl === '/' || nextUrl === '/home') {
      return true;
    } else {
      status = await this.userService.isSetupComplete();
    }

    if (!status) {
      console.log(status);
      this.notification.error('Please complete wallet setup.');
    }
    return status;
  }
}
