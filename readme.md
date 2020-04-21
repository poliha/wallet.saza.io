# Saza

A wallet that supports Stellar Lumens(XLM) and assets issued on the [Stellar](https://www.stellar.org/) network.
Available on Android and Linux desktop.

## Features

Saza supports the following actions

- All Stellar [operations](https://www.stellar.org/developers/guides/concepts/list-of-operations.html).
- Multiple Stellar accounts
- Assets issued on the Stellar network.
- Submit transactions with multiple operations.
- Allows multiple transaction signers
- and much more...

## Key storage

Saza uses the [Ionic storage](https://github.com/ionic-team/ionic-storage) module to store secret keys and other app data in any of the available engines: `sqlite`, `indexeddb`, `websql` or `localstorage` locally on your device. Regardless of which engine, the secret keys are always encrypted with password-based key derived from a PBKDF2 as implemented in the [forge](https://github.com/digitalbazaar/forge#ciphers-1) module.
The only time a secret key is displayed as plain text is when generating a new wallet and when viewing it on the `manage accounts` page.

## Usage

The user guide for Saza can be found at [docs.saza.io](https://docs.saza.io).

## Testing

To run all tests:

```bash
ng test
```

## Building from source

You can build Saza from source for development or usage. To begin, do the following:

Clone this repo and install required packages

```bash
git clone https://github.com/poliha/wallet.saza.io.git
npm install
```

### For development

#### Start a local server running on port 8100

```bash
ionic serve
```

Open `http://localhost:8100` on a browser.

#### To start an mobile emulator

```bash
ionic cordova run android
```

Note that you will need to configure your andriod development environment. Android studion might be required. See the [Ionic guide](https://ionicframework.com/docs/developing/android) about developing for android for more details.

### For usage

#### Build and electron desktop app

```bash
npm run electron:make
```

#### Build an android apk

```bash
ionic cordova build android --prod --release
```

## License

Saza is licensed under an Apache-2.0 license. See [LICENSE](./LICENSE).
