import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  CustomValidators,
  UserService,
  Utility,
} from 'src/app/providers/providers';
import { RecoveryPasswordModalComponent } from 'src/app/components/recovery-password-modal/recovery-password-modal.component';
import { Router } from '@angular/router';
import { SazaAccount } from 'src/app/interfaces/saza';
import { SazaError } from 'src/app/providers/errors';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  changePasswordForm: FormGroup;
  passwordInputs: FormArray;
  private passwordInputsLength = 5;
  private oldData: {
    passwordHash: String;
    recoveryPassword: any;
    accounts: SazaAccount[];
  };
  pageTitle = 'Forgot Password';
  subTitle = '';
  helpUrl = 'https://docs.saza.io/getting-started/forgot-password';

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private menu: MenuController,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private utility: Utility,
    private modalController: ModalController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadData();
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
    // populate input fields
    for (let ctr = 0; ctr < this.passwordInputsLength; ctr++) {
      this.addPasswordInput();
    }

    this.changePasswordForm = this.formBuilder.group({
      newPassword: [
        '',
        Validators.compose([
          Validators.minLength(8),
          Validators.required,
          CustomValidators.isValidPassword(),
        ]),
      ],
      confirmNewPassword: [
        '',
        Validators.compose([
          Validators.minLength(8),
          Validators.required,
          CustomValidators.isValidPassword(),
          CustomValidators.equalTo('newPassword'),
        ]),
      ],
    });
  }

  async loadData() {
    const [passwordHash, recoveryPassword, accounts] = await Promise.all([
      this.userService.getPassword(),
      this.userService.getPasswordRecovery(),
      this.userService.getAccounts(),
    ]);

    this.oldData = {
      passwordHash,
      recoveryPassword,
      accounts,
    };
  }
  // Getters for template
  get passwords() {
    return <FormArray>this.forgotPasswordForm.get('passwords');
  }
  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
  get confirmNewPassword() {
    return this.changePasswordForm.get('confirmNewPassword');
  }

  previousStep() {
    this.stepper.previous();
  }

  nextStep() {
    this.stepper.next();
  }

  createPasswordInput() {
    return this.formBuilder.group({
      password: ['', Validators.compose([Validators.required])],
    });
  }

  addPasswordInput() {
    this.passwordInputs = this.forgotPasswordForm.get('passwords') as FormArray;
    this.passwordInputs.push(this.createPasswordInput());
  }

  async validateRecoveryPassword() {
    try {
      const passwords: Array<string> = this.passwords.value;
      const passwordString = passwords
        .map((item: any) => item.password.trim())
        .join(' ');

      const storedRecovery = await this.userService.getPasswordRecovery();
      if (!storedRecovery) {
        throw new SazaError('Recovery password not stored.');
      }
      const recoveredPassword = this.utility.decrypt(
        storedRecovery,
        passwordString,
      );
      if (!recoveredPassword) {
        throw new SazaError('Invalid passwords provided.');
      }
      return recoveredPassword;
    } catch (error) {
      throw error;
    }
  }

  async attemptRecovery() {
    try {
      const currentPassword = await this.validateRecoveryPassword();
      const newPassword = String(this.newPassword.value).trim();
      const confirmNewPassword = String(this.confirmNewPassword.value).trim();

      if (newPassword !== confirmNewPassword) {
        throw new SazaError('Passwords mismatch');
      }

      const accounts = await this.userService.getAccounts();

      const {
        passwordHash,
        recoveryPassword,
        encrpytedPassword,
        accounts: newAccounts,
      } = this.utility.changePassword({
        currentPassword,
        newPassword,
        accounts,
      });

      // save hash of new password
      await this.userService.setPassword(passwordHash);
      // save new recovery password
      await this.userService.setPasswordRecovery(encrpytedPassword);
      // save user accounts
      for (const acc of newAccounts) {
        await this.userService.setAccount(acc);
      }

      // display recovery password to user
      this.showRecoveryPassword(recoveryPassword);
    } catch (error) {
      // revert to previous values
      await this.userService.setPassword(this.oldData.passwordHash);
      await this.userService.setPasswordRecovery(this.oldData.recoveryPassword);
      for (const acc of this.oldData.accounts) {
        await this.userService.setAccount(acc);
      }

      throw error;
    }
  }

  async showRecoveryPassword(modalValue) {
    const modal = await this.modalController.create({
      component: RecoveryPasswordModalComponent,
      componentProps: { recoveryPassword: modalValue },
      backdropDismiss: false,
    });

    modal.onDidDismiss().then(() => {
      this.router.navigate(['dasbhboard/']);
    });

    return await modal.present();
  }
}
