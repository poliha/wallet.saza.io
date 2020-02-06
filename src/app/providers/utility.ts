import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';
import {
  Keypair,
  Asset,
  Operation,
  TransactionBuilder,
  StrKey,
  FederationServer,
  StellarTomlResolver,
  Memo,
  Account,
} from 'stellar-sdk';
import * as bcrypt from 'bcryptjs';
import * as niceware from 'niceware';
import { SazaAccount } from '../interfaces/saza';
// import { Validators, FormControl } from '@angular/forms';

@Injectable()
export class Utility {
  constructor() {}

  /**
   * Generates a password using phrases.
   */
  generatePassword(): string {
    const temp = niceware.generatePassphrase(10);
    // const tempCaps = temp.map(p => p.charAt().toUpperCase() + p.slice(1));
    return String(temp.join(' ')).toLowerCase();
  }

  /**
   * Returns the bcrypt hash of a given text.
   * @param text The text to be hashed.
   * @param saltRounds The number of rounds used to generate the salt, defaults to 10.
   */
  getHash(text: any, saltRounds = 10): string {
    const hashString = bcrypt.hashSync(text, saltRounds);
    console.log('hashString: ', hashString);
    return hashString;
  }

  /**
   * Checks if a plain text matches hash, returns true or false.
   * @param text plain text to check.
   * @param hash stored hash.
   */
  validateHash(text: string, hash: string): boolean {
    return bcrypt.compareSync(text, hash);
  }

  encrypt(plainText, password) {
    try {
      const numIteration = 4096;
      const salt = Forge.random.getBytesSync(256);
      const key = Forge.pkcs5.pbkdf2(password, salt, numIteration, 32);
      const iv = Forge.random.getBytesSync(16);
      const cipher = Forge.cipher.createCipher('AES-CBC', key);
      cipher.start({ iv: iv });
      cipher.update(Forge.util.createBuffer(plainText));
      cipher.finish();
      const cipherText = Forge.util.encode64(cipher.output.getBytes());
      const rtnObj = {
        text: cipherText,
        salt: Forge.util.encode64(salt),
        iv: Forge.util.encode64(iv),
      };

      return rtnObj;
    } catch (error) {
      console.log('encrypt error: ', error);
      return false;
    }
  }

  decrypt(cipherObj, password) {
    console.log('CO: ', cipherObj, ' PW: ', password);
    try {
      const numIteration = 4096;
      const salt = Forge.util.decode64(cipherObj.salt);
      const iv = Forge.util.decode64(cipherObj.iv);
      const key = Forge.pkcs5.pbkdf2(password, salt, numIteration, 32);
      const decipher = Forge.cipher.createDecipher('AES-CBC', key);
      decipher.start({ iv: iv });

      // if (cipherObj.skey) {
      //   decipher.update(Forge.util.createBuffer(Forge.util.decode64(cipherObj.skey)));
      // } else {
      decipher.update(
        Forge.util.createBuffer(Forge.util.decode64(cipherObj.text)),
      );
      // }

      decipher.finish();
      const decipheredText = decipher.output.toString();

      return decipheredText;
    } catch (error) {
      console.log('decrypt error: ', error);
      return false;
    }
  }

  keypairFromPrivateKey(secret) {
    try {
      return Keypair.fromSecret(secret);
    } catch (error) {
      return false;
    }
  }

  randomKeypair() {
    try {
      return Keypair.random();
    } catch (error) {
      return false;
    }
  }

  generateAsset(assetObj) {
    try {
      if (!assetObj.asset_type) {
        throw new Error('Invalid asset type');
      }

      if (assetObj.asset_type === 'native') {
        return Asset.native();
      }
      return new Asset(
        String(assetObj.asset_code).trim(),
        assetObj.asset_issuer,
      );
    } catch (error) {
      console.error('generateAsset Error: ', error);
      return false;
    }
  }

  validateAccountTag(userAccounts = [], tag = '') {
    const tagExists = account => account.tag === tag;
    if (!tag || userAccounts.some(tagExists)) {
      return `account-${userAccounts.length + 1}`;
    }
    return tag;
  }

  addYears(date, years) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + Number(years));
    return newDate;
  }

  range(size, start = 0) {
    return [...Array(size).keys()].map(i => i + start);
  }

  changePassword({
    currentPassword,
    newPassword,
    accounts,
  }: {
    currentPassword: String;
    newPassword: String;
    accounts: SazaAccount[];
  }) {
    try {
      const passwordHash = this.getHash(newPassword);
      const recoveryPassword = this.generatePassword();

      // use the recovery password to encrypt the new password.
      const encrpytedPassword = this.encrypt(newPassword, recoveryPassword);

      // encrypt user accounts with new password.
      const newAccounts = accounts.map(account => {
        const privatekey = this.decrypt(account.private, currentPassword);
        const encryptedKey = this.encrypt(privatekey, newPassword);
        if (!encryptedKey) {
          throw new Error('Encryption failed with new password.');
        }
        account.private = encryptedKey;
        return account;
      });

      return {
        passwordHash,
        recoveryPassword,
        encrpytedPassword,
        accounts: newAccounts,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
