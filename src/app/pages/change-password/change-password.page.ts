import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  UserService,
  Utility,
  NotificationService,
} from 'src/app/providers/providers';
import { SazaAccount } from 'src/app/interfaces/saza';
import { ModalController } from '@ionic/angular';
import { RecoveryPasswordModalComponent } from 'src/app/components/recovery-password-modal/recovery-password-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  pageTitle = 'Change Password';
  helpUrl = '';
  changePasswordForm: FormGroup;
  oldPasswaordHash: string;
  oldUserAccounts: SazaAccount[];
  oldRecoveryPassword: Object;

  constructor(
    private userService: UserService,
    private utility: Utility,
    private notify: NotificationService,
    private modalController: ModalController,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadData();
    this.makeForm();
  }

  async loadData() {
    this.oldPasswaordHash = await this.userService.getPassword();
    this.oldUserAccounts = await this.userService.getAccounts();
    this.oldRecoveryPassword = await this.userService.getPasswordRecovery();

    console.log('oldPW: ', this.oldPasswaordHash);
    console.log('oldUA: ', this.oldUserAccounts);
    console.log('oldPR: ', this.oldRecoveryPassword);
  }

  makeForm() {
    this.changePasswordForm = new FormGroup({});
    console.log('form: ', this.changePasswordForm);
  }

  // Getters for template
  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
  get confirmNewPassword() {
    return this.changePasswordForm.get('confirmNewPassword');
  }

  async formSubmit() {
    // get entered values, trimmed
    // verify current pwd
    // if not valid, return
    // verify new passwords match
    // if not, return
    // get hash of new password
    // get all accounts
    // decrypt privatekey of  all accounts with old password
    // encrypt decrypted private keys with new password
    // generate recovery key
    // encrypt plaintext new password with recovery key.
    // save newPW hash, newly encrypted accounts and ecrypted plaintext to storage
    // display modal for recovery key
    // redirect to settings or dashboard page
    // if error occurs, reset accounts, passwordHash and recovery password to previous values.
    // Show failed notification
    let errorMessage = '';
    try {
      const currentPassword = String(this.currentPassword.value).trim();
      if (!this.utility.validateHash(currentPassword, this.oldPasswaordHash)) {
        errorMessage = 'Inavlid Password';
        throw errorMessage;
      }

      const newPassword = String(this.newPassword.value).trim();
      const confirmNewPassword = String(this.confirmNewPassword.value).trim();
      if (newPassword !== confirmNewPassword) {
        errorMessage = 'New password mismatch';
        throw errorMessage;
      }

      const newPasswordHash = this.utility.getHash(newPassword);
      const newRecoveryPassword = this.utility.generatePassword();

      // use the recovery password to encrypt the new password.
      const encrpytedPassword = this.utility.encrypt(
        newPassword,
        newRecoveryPassword,
      );
      // save hash of new password
      await this.userService.setPassword(newPasswordHash);
      // save new recovery password
      await this.userService.setPasswordRecovery(encrpytedPassword);
      // save user accounts
      for (const acc of this.oldUserAccounts) {
        const privatekey = this.utility.decrypt(acc.private, currentPassword);
        const encryptedKey = this.utility.encrypt(privatekey, newPassword);
        if (!encryptedKey) {
          errorMessage = 'Encryption failed with new password.';
          throw errorMessage;
        }
        acc.private = encryptedKey;
        await this.userService.setAccount(acc);
      }

      // display recovery password to user
      this.showRecoveryPassword(newRecoveryPassword);
    } catch (error) {
      console.log('Error: ', error);
      this.notify.show(errorMessage);
      // revert to previous values
      await this.userService.setPassword(this.oldPasswaordHash);
      await this.userService.setPasswordRecovery(this.oldRecoveryPassword);
      for (const acc of this.oldUserAccounts) {
        await this.userService.setAccount(acc);
      }
    }
  }

  async showRecoveryPassword(modalValue) {
    const modal = await this.modalController.create({
      component: RecoveryPasswordModalComponent,
      componentProps: { recoveryPassword: modalValue },
      backdropDismiss: false,
    });

    modal.onDidDismiss().then(() => {
      console.log('modal dismissed');
      this.router.navigate(['settings/']);
    });

    return await modal.present();
  }
}
