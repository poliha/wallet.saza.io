import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  UserService,
  Utility,
  NotificationService,
} from 'src/app/providers/providers';
import { ActivatedRoute, Router } from '@angular/router';
import { SazaAccount } from 'src/app/interfaces/saza';
import { IonInput, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manage-accounts-detail',
  templateUrl: './manage-accounts-detail.page.html',
  styleUrls: ['./manage-accounts-detail.page.scss'],
})
export class ManageAccountsDetailPage implements OnInit {
  @ViewChild('accountTagInput') accountTagInput: IonInput;
  @ViewChild('privateKey') privateKey: IonInput;

  updateTagForm: FormGroup;
  accountID;
  accountDetail: SazaAccount;
  userAccounts: SazaAccount[];
  pageTitle = 'Manage Account';
  helpUrl = 'https://docs.saza.io/wallet-actions/settings/manage-accounts';
  showSubmitButton = false;
  showPrivateKeyIcon = 'eye';
  userPassword;
  passwordHash = '';
  decryptedPrivateKey = '';
  constructor(
    private userService: UserService,
    private utility: Utility,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private router: Router,
    private notify: NotificationService,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.accountID = this.route.snapshot.paramMap.get('id');
    this.userService.getPassword().then((pwd) => (this.passwordHash = pwd));
    this.getPassword();
    this.userService.getAccounts().then((data) => {
      if (!data) {
        return;
      }

      this.userAccounts = data;
      this.accountDetail = data[this.accountID];
      if (!this.accountDetail) {
        return;
      }

      this.makeForm();
    });
  }

  makeForm() {
    this.updateTagForm = this.formBuilder.group({
      accountTag: [
        { value: this.accountDetail.tag, disabled: true },
        Validators.compose([Validators.minLength(1), Validators.required]),
      ],
    });
  }

  // getter for template
  get accountTag() {
    return this.updateTagForm.get('accountTag');
  }

  enableTagInput() {
    this.accountTag.enable();
    this.showSubmitButton = true;
    return this.accountTagInput.setFocus();
  }

  async showPrivateKey() {
    this.togglePrivateKeyDisplay();
  }

  getPrivateKey() {
    if (!this.userPassword) {
      return;
    }
    const decryptedKey = this.utility.decrypt(
      this.accountDetail.private,
      this.userPassword,
    );
    return decryptedKey;
  }

  async togglePrivateKeyDisplay() {
    if (!this.privateKey) {
      return;
    }
    const inputType = this.privateKey.type;
    if (inputType === 'text') {
      this.showPrivateKeyIcon = 'eye';
      this.privateKey.type = 'password';
      this.privateKey.value = this.accountDetail.private.text;
    } else {
      this.showPrivateKeyIcon = 'eye-off';
      this.privateKey.type = 'text';
      this.privateKey.value = this.getPrivateKey();
    }
  }

  async getPassword() {
    const alert = await this.alertCtrl.create({
      header: 'Enter Password',
      message: 'Please enter your password to continue',
      backdropDismiss: false,
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Enter password',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return this.router.navigate(['manage-accounts/']);
          },
        },
        {
          text: 'Continue',
          handler: (inputData) => {
            const trimmedPassword = String(inputData.password).trim();
            if (
              !this.utility.validateHash(trimmedPassword, this.passwordHash)
            ) {
              this.notify.error('Invalid Password');
              return this.router.navigate(['manage-accounts/']);
            }
            this.userPassword = trimmedPassword;
            this.decryptedPrivateKey = this.getPrivateKey();
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'This account will be removed from the wallet.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Continue',
          handler: () => {
            this.deleteAccount();
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteAccount() {
    // remove from user accounts list
    const userAccounts = await this.userService.deleteAccountByPublicKey(
      this.accountDetail.public,
    );

    const activeAccount = await this.userService.getActiveAccount();
    // if the deleted account was the active account, reset it.
    if (
      activeAccount === this.accountDetail.public &&
      userAccounts.length > 0
    ) {
      await this.userService.setActiveAccount(userAccounts[0].public);
    }

    // to do remove pending operations with account as source

    return this.router.navigate(['manage-accounts/']);
  }

  saveAccountTag() {
    if (this.accountDetail.tag !== this.accountTag.value) {
      this.accountDetail.tag = this.utility.validateAccountTag(
        this.userAccounts,
        this.accountTag.value,
      );
      this.userService.setAccount(this.accountDetail);
    }
    this.showSubmitButton = false;
    this.accountTag.disable();
  }
}
