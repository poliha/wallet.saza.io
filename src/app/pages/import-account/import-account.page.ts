import { Component, OnInit } from '@angular/core';
import { SazaAccount } from 'src/app/interfaces/saza';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  UserService,
  Utility,
  NotificationService,
} from 'src/app/providers/providers';
import { SazaError } from 'src/app/providers/errors';

@Component({
  selector: 'app-import-account',
  templateUrl: './import-account.page.html',
  styleUrls: ['./import-account.page.scss'],
})
export class ImportAccountPage implements OnInit {
  userAccounts: SazaAccount[];
  importAccountForm: FormGroup;
  dataToImport: String;
  pageTitle = 'Import Accounts';
  helpUrl = 'https://docs.saza.io/wallet-actions/settings/import-account';
  constructor(
    private userService: UserService,
    private utility: Utility,
    public notification: NotificationService,
  ) {}

  ngOnInit() {
    this.userService.userAccounts.subscribe((data) => {
      this.userAccounts = data;
    });
    this.makeForm();
  }

  makeForm() {
    this.importAccountForm = new FormGroup({
      backupData: new FormControl('', Validators.required),
    });
  }

  // Getters for template
  get password() {
    return this.importAccountForm.get('password');
  }
  get backupKey() {
    return this.importAccountForm.get('backupKey');
  }
  get backupData() {
    return this.importAccountForm.get('backupData');
  }

  getPublicKey(secretKey) {
    const pair = this.utility.keypairFromPrivateKey(secretKey);
    if (!pair) {
      throw new SazaError('Invalid Private Key');
    }
    return pair.publicKey();
  }

  async importAccounts() {
    const userPassword = this.password.value;
    const passwordHash = await this.userService.getPassword();

    if (!this.utility.validateHash(userPassword, passwordHash)) {
      throw new SazaError('Invalid password.');
    }

    const backupKey = String(this.backupKey.value).trim();
    const backupData = String(this.backupData.value).trim();

    if (!backupKey || !backupData) {
      throw new SazaError('Backup key and data are required.');
    }

    const dataToImport = backupData.split(';').map((data: String) => {
      const [text, salt, iv] = data.split('|');
      return { text, salt, iv };
    });

    if (!dataToImport || !Array.isArray(dataToImport)) {
      throw new SazaError('Invalid backup data provided.');
    }

    for (const account of dataToImport) {
      const privatekey = this.utility.decrypt(account, backupKey);
      const encryptedKey = this.utility.encrypt(privatekey, userPassword);
      if (!privatekey || !encryptedKey) {
        throw new SazaError('Import failed, please check your backup key.');
      }
      const accountToSave = {
        public: this.getPublicKey(privatekey),
        private: encryptedKey,
        tag: this.utility.validateAccountTag(this.userAccounts),
      };

      await this.userService.setAccount(accountToSave);
      this.notification.success(`Imported ${dataToImport.length} accounts.`);
    }

    this.importAccountForm.reset();
  }
}
