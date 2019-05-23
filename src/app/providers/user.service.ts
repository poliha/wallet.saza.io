import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SazaAccount } from '../interfaces/saza';

const STORAGE_KEYS = {
  'ACCOUNT': 'user.saza.account',
  'ID': 'user.saza.id',
  'PASSWORD': 'user.saza.pwd',
  'PASSWORDRECOVERY': 'user.saza.pwd.recovery'
}



// todo create account interface for storing account objects
// use behaviour subjects for local member variable.

@Injectable()
export class UserService {

  constructor(public storage: Storage) { }

  /**
   * Get the value of ID
   */
  getID() {
    return this.getData(STORAGE_KEYS.ID);
  }

  /**
   * Set the ID of a user
   * @param data - ID to be saved
   */
  setID(data) {
    return this.setData(STORAGE_KEYS.ID, data);
  }

  /**
   * Get the saved password
   */
  getPassword() {
    return this.getData(STORAGE_KEYS.PASSWORD);
  }

  /**
   * Save the recovery password.
   * @param data - password to be saved
   */
  setPasswordRecovery(data) {
    return this.setData(STORAGE_KEYS.PASSWORDRECOVERY, data);
  }

  /**
  * Get the saved recovery password
  */
  getPasswordRecovery() {
    return this.getData(STORAGE_KEYS.PASSWORDRECOVERY);
  }

  /**
   * Save a password
   * @param data - password to be saved
   */
  setPassword(data) {
    return this.setData(STORAGE_KEYS.PASSWORD, data);
  }

  /**
   * Get stored accounts
   */
  getAccounts() {
    return this.getData(STORAGE_KEYS.ACCOUNT);
  }

  /**
   * Stores and account object
   * @param data - account object to be stored
   */
  setAccount(data: SazaAccount) {
    return this.getAccounts().then((accounts: Array<SazaAccount>) => {
      let accountFound = false;
      let allAccounts: Array<SazaAccount> = [];
      if (accounts) {
        allAccounts = accounts.map(a => {
          if (a.public === data.public) {
            accountFound = true;
            a = data;
          }
          return a;
        });
      }

      if (!accountFound) {
        allAccounts.push(data);
      }

      return this.setData(STORAGE_KEYS.ACCOUNT, allAccounts);
    });
  }

  /**
   * Get the data from storage identified by key.
   * @param key - Identifier of stored value
   */
  getData(key) {
    return this.storage.get(key);
  }

  /**
   * Sets the data to be stored
   * @param key - Identifier of value to be stored
   * @param value - Value to be stored
   */
  setData(key, value) {
    return this.storage.set(key, value);
  }

}