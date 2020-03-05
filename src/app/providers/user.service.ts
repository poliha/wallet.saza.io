import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SazaAccount } from '../interfaces/saza';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const STORAGE_KEYS = {
  ACCOUNTS: 'user.saza.account',
  ID: 'user.saza.id',
  PASSWORD: 'user.saza.pwd',
  PASSWORDRECOVERY: 'user.saza.pwd.recovery',
  ACTIVE_ACCOUNT: 'user.saza.account.active',
  ACTIVE_NETWORK: 'user.saza.network.active',
  LOGGED_IN: 'user.saza.loggedin',
  ACCOUNT_HISTORY: 'user.saza.accountHistory',
};

const STELLAR_NETWORKS = {
  pubnet: {
    type: 'pubnet',
    passphrase: `Public Global Stellar Network ; September 2015`,
    horizon: `https://horizon.stellar.org/`,
  },
  testnet: {
    type: 'testnet',
    passphrase: `Test SDF Network ; September 2015`,
    horizon: `https://horizon-testnet.stellar.org/`,
  },
};

@Injectable()
export class UserService {
  public userAccounts: BehaviorSubject<SazaAccount[]> = new BehaviorSubject<
    SazaAccount[]
  >([]);
  public activeAccount: BehaviorSubject<string> = new BehaviorSubject<string>(
    '',
  );
  public activeNetwork: BehaviorSubject<any> = new BehaviorSubject(
    STELLAR_NETWORKS.pubnet,
  );

  constructor(public storage: Storage) {
    console.log('User service setup');
    this.getAccounts();
    this.getActiveAccount();
    this.getActiveNetwork();
    this.isAuthValid();
  }

  /**
   * Get the value of the active account
   */
  getActiveAccount() {
    return this.getData(STORAGE_KEYS.ACTIVE_ACCOUNT).then((account: string) => {
      this.activeAccount.next(account);
      return account;
    });
  }

  /**
   * Set the active account
   * @param account - account to be saved
   */
  setActiveAccount(account: string) {
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

  isAuthValid() {
    return this.getData(STORAGE_KEYS.LOGGED_IN).then((loginData: any) => {
      if (!loginData) {
        return false;
      }
      const elapsedTime = Date.now() - Number(loginData.timestamp);
      console.log('elapsed: ', elapsedTime);

      if (elapsedTime > environment.AUTH_TIMEOUT) {
        return false;
      }
      this.login(); // resets the timestamp
      return true;
    });
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
   * Save a password
   * @param data - password to be saved
   */
  setPassword(data) {
    return this.setData(STORAGE_KEYS.PASSWORD, data);
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
   * Get stored accounts
   */
  getAccounts() {
    return this.getData(STORAGE_KEYS.ACCOUNTS).then(
      (accounts: Array<SazaAccount>) => {
        if (accounts == null) {
          accounts = [];
        }
        this.userAccounts.next(accounts);
        return accounts;
      },
    );
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
            a = { ...data };
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

  deleteAccount(id) {
    const accountId = parseInt(id, 10);
    if (!Number.isInteger(accountId)) {
      return;
    }
    return this.getAccounts().then((accounts: Array<SazaAccount>) => {
      accounts.splice(accountId, 1);
      this.setData(STORAGE_KEYS.ACCOUNTS, accounts);
      this.userAccounts.next(accounts);
      return accounts;
    });
  }

  deleteAccountByPublicKey(publicKey) {
    if (!publicKey) {
      return;
    }
    return this.getAccounts().then((accounts: Array<SazaAccount>) => {
      const filteredAccounts = accounts.filter(a => a.public !== publicKey);
      this.setData(STORAGE_KEYS.ACCOUNTS, filteredAccounts);
      this.userAccounts.next(filteredAccounts);
      return filteredAccounts;
    });
  }

  login() {
    const loginStatus = {
      status: true,
      timestamp: Date.now(),
    };
    return this.setData(STORAGE_KEYS.LOGGED_IN, loginStatus);
  }

  logout() {
    const loginStatus = {
      status: false,
      timestamp: 0,
    };
    return this.setData(STORAGE_KEYS.LOGGED_IN, loginStatus);
  }

  async isSetupComplete() {
    const values = await Promise.all([
      this.getPassword(),
      this.getPasswordRecovery(),
    ]);

    if (!values.length) {
      return false;
    }

    if (values.some(v => v === null)) {
      return false;
    }

    return true;
  }

  setAccountHistory(data) {
    return this.setData(STORAGE_KEYS.ACCOUNT_HISTORY, data);
  }

  getAccountHistory() {
    return this.getData(STORAGE_KEYS.ACCOUNT_HISTORY);
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
