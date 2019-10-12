import { FormControl, Validators } from '@angular/forms';
import { StrKey } from 'stellar-sdk';

export class CustomValidators extends Validators {
  static requiredIf(otherControlName) {

    let mainControlValue;
    let otherControlValue;

    return (c: FormControl) => {

      if (!c.parent) {
        return null;
      }

      if (!c.parent) {
        return null;
      }

      mainControlValue = c.value;
      otherControlValue = c.parent.get(otherControlName).value;

      const subscription = c.parent.get(otherControlName).valueChanges.subscribe(() => {
        c.updateValueAndValidity();
      });

      if ((mainControlValue == null || mainControlValue === undefined || mainControlValue === '') && otherControlValue) {
        return {
          requiredIf: true
        };
      }

      subscription.unsubscribe();
      return null;

    };

  }

  static equalTo(otherControlName) {

    let mainControlValue;
    let otherControlValue;

    return (c: FormControl) => {

      if (!c.parent) {
        return null;
      }

      mainControlValue = c.value;
      otherControlValue = c.parent.get(otherControlName).value;

      const subscription = c.parent.get(otherControlName).valueChanges.subscribe(() => {
        c.updateValueAndValidity();
      });

      if (mainControlValue !== otherControlValue) {
        return {
          equalTo: true
        };
      }

      subscription.unsubscribe();
      return null;

    };

  }

  static isTrue() {
    return (c: FormControl) => {
      if (c.value) {
        return c.value === true ? null : { isTrue: true };
      }

      return null;
    };
  }

  static requiredIfTrue(key, val) {
    return (c: FormControl) => {
      return key === val ? null : { requiredIfTrue: true };
    };
  }

  static requiredIfNotTrue(key, val) {
    return (c: FormControl) => {
      return key !== val ? null : { requiredIfTrue: true };
    };
  }

  static isValidPublicKey() {
    return (c: FormControl) => {
      if (c.value) {
        return StrKey.isValidEd25519PublicKey(c.value) ? null : { isValidPublicKey: true };
      }
      return null;
    };
  }

  static isValidPrivateKey() {
    return (c: FormControl) => {
      if (c.value) {
        return StrKey.isValidEd25519SecretSeed(c.value) ? null : { isValidPrivateKey: true };
      }
      return null;
    };
  }

  static isValidRecipient() {

    return (c: FormControl) => {
      const isEmail = this.email(c);
      const isPublicKey = StrKey.isValidEd25519PublicKey(c.value);
      const federationRegex = /^(?!:\/\/)([a-zA-Z0-9-@_.]+\*)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi;
      const isFederatedAddress = federationRegex.test(c.value);

      if (!isEmail || isPublicKey || isFederatedAddress) {
        return null;
      }
      return { isValidRecipient: true };

    };

  }

  static isValidPassword() {
    return (c: FormControl) => {
      if (c.value) {
        const passwordRegex = /^[\w\s#$^+=!*()@%&]{8,}$/gi;
        return passwordRegex.test(String(c.value).trim()) ? null : { isValidPassword: true };
      }
      return null;
    };
  }

}
