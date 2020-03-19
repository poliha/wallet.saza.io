import { Component, OnInit } from '@angular/core';
import { UserService, Utility } from 'src/app/providers/providers';
import { SazaAccount } from 'src/app/interfaces/saza';
import { FormGroup } from '@angular/forms';
import { SazaError } from 'src/app/providers/errors';

@Component({
  selector: 'app-export-account',
  templateUrl: './export-account.page.html',
  styleUrls: ['./export-account.page.scss'],
})
export class ExportAccountPage implements OnInit {
  exportGenerated = false;
  userAccounts: SazaAccount[];
  exportAccountForm: FormGroup;
  encryptionKey: String;
  dataToExport: String;
  pageTitle = 'Export Accounts';
  constructor(private userService: UserService, private utility: Utility) {}

  ngOnInit() {
    this.userService.userAccounts.subscribe(data => {
      this.userAccounts = data;
      console.log('user account', this.userAccounts);
    });
    this.makeForm();
  }

  makeForm() {
    this.exportAccountForm = new FormGroup({});
  }

  // Getters for template
  get password() {
    return this.exportAccountForm.get('password');
  }

  itemCopied(item) {
    console.log('item: ', item);
  }

  toggleExportGenerated() {
    this.exportGenerated = !this.exportGenerated;
  }

  async exportAccounts() {
    const userPassword = this.password.value;
    const passwordHash = await this.userService.getPassword();

    if (!this.utility.validateHash(userPassword, passwordHash)) {
      throw new SazaError('Invalid password.');
    }

    this.encryptionKey = this.utility.generatePassword();

    this.dataToExport = this.userAccounts
      .map(account => {
        const privatekey = this.utility.decrypt(account.private, userPassword);
        const encryptedKey = this.utility.encrypt(
          privatekey,
          this.encryptionKey,
        );
        if (!privatekey || !encryptedKey) {
          throw new SazaError('Encryption failed while exporting accounts.');
        }
        const { text, salt, iv } = encryptedKey;
        return `${text}|${salt}|${iv}`;
      })
      .join(';');

    console.log('encKey: ', this.encryptionKey);
    console.log('exp: ', this.dataToExport);
    this.exportAccountForm.reset();
    this.toggleExportGenerated();
  }

  cancelExport() {
    this.exportAccountForm.reset();
    this.toggleExportGenerated();
  }
}
