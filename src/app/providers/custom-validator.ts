import {
  FormControl,
  Validators,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { StrKey, UnsignedHyper } from 'stellar-sdk';
import { Buffer } from 'buffer';

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

      const subscription = c.parent
        .get(otherControlName)
        .valueChanges.subscribe(() => {
          c.updateValueAndValidity();
        });

      if (
        (mainControlValue == null ||
          mainControlValue === undefined ||
          mainControlValue === '') &&
        otherControlValue
      ) {
        return {
          requiredIf: true,
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

      const subscription = c.parent
        .get(otherControlName)
        .valueChanges.subscribe(() => {
          c.updateValueAndValidity();
        });

      if (mainControlValue !== otherControlValue) {
        return {
          equalTo: true,
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
        return StrKey.isValidEd25519PublicKey(c.value)
          ? null
          : { isValidPublicKey: true };
      }
      return null;
    };
  }

  static isValidPrivateKey() {
    return (c: FormControl) => {
      if (c.value) {
        return StrKey.isValidEd25519SecretSeed(c.value)
          ? null
          : { isValidPrivateKey: true };
      }
      return null;
    };
  }

  static isValidRecipient() {
    return (c: FormControl) => {
      const isEmail = this.email(c);
      const isPublicKey = StrKey.isValidEd25519PublicKey(c.value);
      const federationRegex = /^(?!:\/\/)([a-zA-Z0-9-@_.+]+\*)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi;
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
        return passwordRegex.test(String(c.value).trim())
          ? null
          : { isValidPassword: true };
      }
      return null;
    };
  }

  static isValidMemo(control: FormGroup): ValidationErrors | null {
    const memoType = control.get('memoType');
    const memoValue = control.get('memoValue');
    let memoError = '';
    if (memoType.value && memoValue.value) {
      switch (memoType.value) {
        case 'text':
          const memoTextBytes = Buffer.byteLength(memoValue.value, 'utf8');
          if (memoTextBytes > 28) {
            memoError = `Memo Text accepts a string of up to 28 bytes. ${memoTextBytes} bytes entered.`;
          }
          break;
        case 'id':
          if (
            !memoValue.value.match(/^[0-9]*$/g) ||
            Number(memoValue.value) < 0
          ) {
            memoError = 'Memo ID accepts a positive integer.';
          }
          if (
            !Number.isNaN(Number(memoValue.value)) &&
            memoValue.value !==
              UnsignedHyper.fromString(memoValue.value).toString()
          ) {
            memoError = `Memo ID is an unsigned 64-bit integer and the max valid value is ${UnsignedHyper.MAX_UNSIGNED_VALUE.toString()}`;
          }
          break;
        case 'hash':
        case 'return':
          if (!memoValue.value.match(/^[0-9a-f]{64}$/gi)) {
            memoError = `Memo ${memoType.value} accepts a 32-byte hash in hexadecimal format (64 characters).`;
          }
          break;
      }
    }
    return memoType && memoValue && memoError
      ? { isValidMemo: memoError }
      : null;
  }

  static isValidSignerType(control: FormGroup): ValidationErrors | null {
    const signerType = control.get('signerType');
    const signerKey = control.get('signerKey');
    const signerWeight = control.get('signerWeight');
    let signerError = '';
    if (signerType.value && signerKey.value) {
      switch (signerType.value) {
        case 'ed25519PublicKey':
          if (!StrKey.isValidEd25519PublicKey(signerKey.value)) {
            signerError = `A valid Ed25519 Public Key is required.`;
          }
          break;
        case 'sha256Hash':
        case 'preAuthTx':
          if (!signerKey.value.match(/^[0-9a-f]{64}$/gi)) {
            signerError = `${signerType.value} accepts a 32-byte hash in hexadecimal format (64 characters).`;
          }
          break;
      }
    }
    if (!(0 <= signerWeight.value && signerWeight.value <= 255)) {
      signerError = `Weight accepts only positive integers between 0 and 255.`;
    }
    return signerType && signerKey && signerWeight && signerError
      ? { isValidSignerType: signerError }
      : null;
  }
}
