import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';
import {
  Keypair, Asset, Operation, TransactionBuilder, StrKey,
  FederationServer, StellarTomlResolver, Memo, Account
} from 'stellar-sdk';
import * as bcrypt from 'bcryptjs';
import * as niceware from 'niceware';
// import { Validators, FormControl } from '@angular/forms';

@Injectable()
export class Utility {
  constructor() { }

  /**
   * Generates a password using phrases.
   */
  generatePassword(): string {
    const temp = niceware.generatePassphrase(10);
    const tempCaps = temp.map(p => p.charAt().toUpperCase() + p.slice(1));
    return tempCaps.join(' ');
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
  validateHash(text: string, hash:  string): boolean {
    return bcrypt.compareSync(text, hash);
  }

  encrypt(plainText, password) {
    try {
      const numIteration = 4096;
      const salt = Forge.random.getBytesSync(256);
      const key = Forge.pkcs5.pbkdf2(password, salt, numIteration, 32);
      const iv = Forge.random.getBytesSync(16);
      let cipher = Forge.cipher.createCipher('AES-CBC', key);
      cipher.start({ iv: iv });
      cipher.update(Forge.util.createBuffer(plainText));
      cipher.finish();
      let cipherText = Forge.util.encode64(cipher.output.getBytes());
      let rtnObj = {
        text: cipherText,
        salt: Forge.util.encode64(salt),
        iv: Forge.util.encode64(iv)
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
      let decipher = Forge.cipher.createDecipher('AES-CBC', key);
      decipher.start({ iv: iv });

      // if (cipherObj.skey) {
      //   decipher.update(Forge.util.createBuffer(Forge.util.decode64(cipherObj.skey)));
      // } else {
        decipher.update(Forge.util.createBuffer(Forge.util.decode64(cipherObj.text)));
      // }


      decipher.finish();
      let decipheredText = decipher.output.toString();

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
      return new Asset(assetObj.asset_code, assetObj.asset_issuer);
    } catch (error) {
      console.error('generateAsset Error: ', error);
      return false;
    }
  }

  validateAccountTag(userAccounts = [], tag = '') {
    const tagExists = (account) => account.tag === tag;
    if (!tag || userAccounts.some(tagExists)) {
      return `account-${userAccounts.length + 1}`;
    }
    return tag;
  }
}
