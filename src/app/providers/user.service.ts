import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SazaAccount } from '../interfaces/saza';
import { BehaviorSubject } from 'rxjs';


const STORAGE_KEYS = {
  'ACCOUNTS': 'user.saza.account',
  'ID': 'user.saza.id',
  'PASSWORD': 'user.saza.pwd',
  'PASSWORDRECOVERY': 'user.saza.pwd.recovery',
  'ACTIVE_ACCOUNT': 'user.saza.account.active',
  'ACTIVE_NETWORK': 'user.saza.network.active',
};

const STELLAR_NETWORKS = {
  'pubnet': {
    'passphrase': `Public Global Stellar Network ; September 2015`,
    'horizon': `https://horizon.stellar.org/`
  },
  'testnet': {
    'passphrase': `Test SDF Network ; September 2015`,
    'horizon': `https://horizon-testnet.stellar.org/`
  },
};

@Injectable()
export class UserService {

  public userAccounts: BehaviorSubject<SazaAccount[]> = new BehaviorSubject<SazaAccount[]>([]);
  public activeAccount: BehaviorSubject<SazaAccount> = new BehaviorSubject<SazaAccount>(null);
  public activeNetwork: BehaviorSubject<any> = new BehaviorSubject(STELLAR_NETWORKS.pubnet);

  constructor(public storage: Storage) {
    this.getAccounts();
    this.getActiveAccount();
    this.getActiveNetwork();
  }

  /**
   * Get the value of the active account
   */
  getActiveAccount() {
    return this.getData(STORAGE_KEYS.ACTIVE_ACCOUNT).then((account: SazaAccount) => {
      this.setActiveAccount(account);
    });
  }

  /**
   * Set the active account
   * @param account - account to be saved
   */
  setActiveAccount(account) {
    this.activeAccount.next(account);
    return this.setData(STORAGE_KEYS.ACTIVE_ACCOUNT, account);
  }

  /**
   * Get the value of the active network
   */
  getActiveNetwork() {
    return this.getData(STORAGE_KEYS.ACTIVE_NETWORK).then((network: any) => {
      if (network == null) {
        this.setActiveNetwork('pubnet');
      } else {
        this.activeNetwork.next(network);
      }
    });
  }

  /**
   * Set the active network
   * @param network - network to be saved
   */
  setActiveNetwork(network) {
    this.activeNetwork.next(STELLAR_NETWORKS[network]);
    return this.setData(STORAGE_KEYS.ACTIVE_NETWORK, STELLAR_NETWORKS[network]);
  }


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
    return this.getData(STORAGE_KEYS.ACCOUNTS).then((accounts: Array<SazaAccount>) => {
      this.userAccounts.next(accounts);
      // to do: refactor this
      return this.getData(STORAGE_KEYS.ACCOUNTS)
    });
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

      this.setData(STORAGE_KEYS.ACCOUNTS, allAccounts);
      this.userAccounts.next(allAccounts);
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