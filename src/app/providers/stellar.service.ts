import { Injectable } from '@angular/core';
import {
  Networks,
  Keypair,
  Asset,
  Operation,
  TransactionBuilder,
  StrKey,
  FederationServer,
  StellarTomlResolver,
  Memo,
  Account,
  Server,
  xdr,
  TimeoutInfinite,
  Transaction,
  AuthRequiredFlag,
  AuthRevocableFlag,
  AuthImmutableFlag,
} from 'stellar-sdk';
import { Buffer } from 'buffer';
import { UserService } from './user.service';
import { SazaError } from './errors';
import { NotFoundError } from 'stellar-sdk';

@Injectable({
  providedIn: 'root',
})
export class StellarService {
  activeNetwork: any;
  server: any;

  operationType = Object.freeze({
    CREATE_ACCOUNT: 'create_account',
    PAYMENT: 'payment',
    PATH_PAYMENT_STRICT_SEND: 'path_payment_strict_send',
    PATH_PAYMENT_STRICT_RECEIVE: 'path_payment_strict_receive',
    MANAGE_BUY_OFFER: 'manage_buy_offer',
    MANAGE_SELL_OFFER: 'manage_sell_offer',
    CREATE_PASSIVE_SELL_OFFER: 'create_passive_sell_offer',
    SET_OPTIONS: 'set_options',
    CHANGE_TRUST: 'change_trust',
    ALLOW_TRUST: 'allow_trust',
    ACCOUNT_MERGE: 'account_merge',
    MANAGE_DATA: 'manage_data',
    BUMP_SEQUENCE: 'bump_sequence',
  });

  constructor(private userService: UserService) {
    this.initializeService();
  }

  initializeService() {
    this.userService.activeNetwork.subscribe(data => {
      this.activeNetwork = data;
      this.server = new Server(this.activeNetwork.horizon);
    });
  }

  async loadAccount(accountID) {
    try {
      const accountDetail = await this.server.loadAccount(accountID);
      return accountDetail;
    } catch (error) {
      console.log('error: ', error);
      if (error instanceof NotFoundError) {
        throw new SazaError(`${accountID} is not active. Please fund account.`);
      } else {
        throw error;
      }
    }
  }

  async loadEffects(accountID) {
    try {
      const accountEffects = await this.server
        .effects()
        .forAccount(accountID)
        .order('desc')
        .join('transactions')
        .call();
      return accountEffects;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async loadOperations(accountID) {
    try {
      const accountOperations = await this.server
        .operations()
        .forAccount(accountID)
        .order('desc')
        .join('transactions')
        .call();
      return accountOperations;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async fees() {
    try {
      const feeStats = await this.server.feeStats();
      return feeStats;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async buildTransaction({ fee, memo, operations, source, timebounds }) {
    // load source account
    const isSourceActive = await this.isAccountActive(source);
    if (!isSourceActive) {
      throw new Error('Source account is not active.');
    }

    const sourceAccount = await this.loadAccount(source);
    let newTx = new TransactionBuilder(sourceAccount, {
      fee: Number(fee),
      timebounds,
    });

    // add operations
    operations.forEach(op => {
      const opBuffer = Buffer.from(op.tx, 'base64');
      const opXdr = xdr.Operation.fromXDR(opBuffer);
      newTx = newTx.addOperation(opXdr);
    });

    // add memo
    const { memoType, memoValue } = memo;
    if (memoType && memoValue) {
      newTx = newTx.addMemo(new Memo(memoType, memoValue));
    }

    newTx = newTx.setNetworkPassphrase(this.activeNetwork.passphrase);

    // add default timebound if non are provided
    const { minTime, maxTime } = timebounds;
    if (!minTime && !maxTime) {
      newTx = newTx.setTimeout(TimeoutInfinite);
    }

    const builtTx = newTx.build();
    const txXdr = builtTx
      .toEnvelope()
      .toXDR()
      .toString('base64');

    return txXdr;
  }

  /**
   * returns a Set of the source accounts in a transaction
   * @param tx base64 encoded string
   */
  txSourceAccounts(tx = '') {
    try {
      if (!tx) {
        throw new Error('Invalid transaction string');
      }
      const txObj = new Transaction(tx);
      const publicKeySet = new Set([txObj.source]);

      txObj.operations.forEach(op => {
        publicKeySet.add(op.source);
      });
      return publicKeySet;
    } catch (error) {
      console.log('err: ', error);
      return new Set();
    }
  }

  /**
   * txSigners method returns a Set of public keys that are eligible to sign the given transaction.
   * @param tx base64 encoded transaction string
   */
  async txSigners(tx = '') {
    try {
      if (!tx) {
        throw new Error('Invalid transaction string');
      }
      const txObj = new Transaction(tx);
      const signerSet = new Set();
      const allSigners = [];
      for (const op of txObj.operations) {
        if (!op.source) {
          op.source = txObj.source;
        }
        const opSigner = await this.operationSigners(op.source, op.type);
        allSigners.push(...opSigner);
      }
      // get the signers for tx source account. Setting the opType to 'allow_trust'
      // because transaction processing is a low priority operation.
      const txSigner = await this.operationSigners(txObj.source, 'allow_trust');
      allSigners.push(...txSigner);

      allSigners.forEach(s => signerSet.add(s));
      return signerSet;
    } catch (error) {
      console.log('err: ', error);
      return new Set();
    }
  }

  async operationSigners(source: string, opType: string) {
    try {
      const accountDetail = await this.loadAccount(source);
      console.log(accountDetail);
      const { signers, thresholds } = accountDetail;
      if (signers.length === 1) {
        return [signers[0].key];
      } else {
        const opThreshold = this.operationThreshold(opType);
        return this.eligibleSigners(thresholds[opThreshold], signers);
      }
    } catch (error) {
      console.log('err: ', error);
      return [];
    }
  }

  /**
   * Returns the threshold for a given operation
   * @param opName stellar operation name
   */
  operationThreshold(opName: string) {
    let threshold = '';
    switch (opName) {
      case 'allow_trust':
      case 'bump_sequence':
        threshold = 'low_threshold';
        break;
      case 'set_options':
      case 'account_merge':
        threshold = 'high_threshold';
        break;
      default:
        threshold = 'med_threshold';
        break;
    }
    return threshold;
  }

  /**
   * Given an array of signers and a thresholdWeight, eligibleSigners method returns the combination
   * of public keys with the sum of weights equal to or greater than the thresholdWeight.
   * @param weight The weight that signers are required for.
   * @param signers An array of signer objects
   */
  eligibleSigners(weight, signers) {
    if (signers.length === 1) {
      return [signers[0].key];
    }

    const [...localSigners] = signers;
    localSigners.sort((a, b) => b.weight - a.weight);

    let totalWeight = 0;
    const eligibleKeys = [];

    for (let i = 0; i < localSigners.length; i++) {
      totalWeight += localSigners[i].weight;
      eligibleKeys.push(localSigners[i].key);
      if (totalWeight >= weight) {
        break;
      }
    }

    return eligibleKeys;
  }

  signTx(tx: string, ...privateKeys: string[]) {
    const txObj = new Transaction(tx, this.activeNetwork.passphrase);
    console.log('PKs: ', privateKeys);
    privateKeys.forEach(key => {
      console.log('key: ', key);
      txObj.sign(Keypair.fromSecret(key));
    });
    console.log('signedTx obj', txObj);
    return txObj.toXDR();
  }

  async submitTx(tx: string) {
    try {
      const txObj = new Transaction(tx);
      const txResult = await this.server.submitTransaction(txObj);
      console.log('txResult: ', txResult);
      return txResult;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async resolveFederatedAddress(address: string) {
    try {
      const result = await FederationServer.resolve(address);
      return result;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  async isAccountActive(accountID: string) {
    const result = await this.loadAccount(accountID);
    console.log('result is: ', result);
    return Boolean(result);
  }

  async buildOperation(operationData) {
    // to do export constant of optype names ans use that instead
    // if opsObj.source, check if source is active, raise error if not
    // switch type - 14 conditions
    // build operation based on type.
    try {
      const { opType, ...opData } = operationData;
      if (opData.source) {
        const isSourceActive = await this.isAccountActive(opData.source);
        if (!isSourceActive) {
          throw new Error('Source account is not active.');
        }
      }

      let newOp;
      switch (opType) {
        case this.operationType.CREATE_ACCOUNT:
          newOp = Operation.createAccount(opData);
          break;
        case this.operationType.PAYMENT:
          newOp = Operation.payment(opData);
          break;
        case this.operationType.PATH_PAYMENT_STRICT_SEND:
          newOp = Operation.pathPaymentStrictSend(opData);
          break;
        case this.operationType.PATH_PAYMENT_STRICT_RECEIVE:
          newOp = Operation.pathPaymentStrictReceive(opData);
          break;
        case this.operationType.MANAGE_BUY_OFFER:
          newOp = Operation.manageBuyOffer(opData);
          break;
        case this.operationType.MANAGE_SELL_OFFER:
          newOp = Operation.manageSellOffer(opData);
          break;
        case this.operationType.CREATE_PASSIVE_SELL_OFFER:
          newOp = Operation.createPassiveSellOffer(opData);
          break;
        case this.operationType.SET_OPTIONS:
          newOp = Operation.setOptions(this.buildSetOptionsParams(opData));
          break;
        case this.operationType.CHANGE_TRUST:
          newOp = Operation.changeTrust(opData);
          break;
        case this.operationType.ALLOW_TRUST:
          newOp = Operation.allowTrust(opData);
          break;
        case this.operationType.ACCOUNT_MERGE:
          newOp = Operation.accountMerge(opData);
          break;
        case this.operationType.MANAGE_DATA:
          newOp = Operation.manageData(opData);
          break;
        case this.operationType.BUMP_SEQUENCE:
          newOp = Operation.bumpSequence(opData);
          break;
        default:
          throw new Error('invalid operation type');
      }
      return newOp.toXDR().toString('base64');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Given an array of operations in base64 xdr format, this method converts it to an array of
   *  Stellar operation objects which are reqular javascript object and hence easier to read.
   * @param opList an array of operations
   */
  getOperationObject(opList: any[]) {
    if (!Array.isArray(opList) || !opList.length) {
      return [];
    }
    return opList.map(op => {
      const opBuffer = Buffer.from(op.tx, 'base64');
      const opXdr = xdr.Operation.fromXDR(opBuffer);
      return Operation.fromXDRObject(opXdr);
    });
  }

  loadTransactionObject(tx: string) {
    if (!tx) {
      return null;
    }
    return new Transaction(tx, this.activeNetwork.passphrase);
  }

  buildSetOptionsParams(params: any) {
    const operationParams: any = {};

    // remove null values
    Object.keys(params).forEach(param => {
      if (params[param]) {
        operationParams[param] = params[param];
      }
    });

    console.log('opsParams: ', operationParams);

    const AUTH_FLAGS = {
      authRequired: AuthRequiredFlag,
      authRevocable: AuthRevocableFlag,
      authImmutable: AuthImmutableFlag,
    };

    // check for these objects and overwrite with correct format
    const { setFlags, clearFlags, signer } = operationParams;

    if (setFlags) {
      let setFlagValue = 0;

      for (const flag in setFlags) {
        if (setFlags[flag]) {
          setFlagValue += AUTH_FLAGS[flag];
        }
      }
      operationParams.setFlags = setFlagValue;
    }

    if (clearFlags) {
      let clearFlagValue = 0;
      for (const flag in clearFlags) {
        if (clearFlags[flag]) {
          clearFlagValue += AUTH_FLAGS[flag];
        }
      }
      operationParams.clearFlags = clearFlagValue;
    }

    if (!(signer.signerType && signer.signerWeight && signer.signerKey)) {
      delete operationParams.signer;
    } else {
      operationParams.signer = {
        [signer.signerType]: signer.signerKey,
        weight: signer.signerWeight,
      };
    }

    console.log('opsParams 1: ', operationParams);
    return operationParams;
  }

  async findPathReceive(options: {
    destinationAsset: any;
    destinationAmount: string;
    source: string;
  }) {
    try {
      const { records } = await this.server
        .strictReceivePaths(
          options.source,
          options.destinationAsset,
          options.destinationAmount,
        )
        .call();
      console.log('response: ', records);
      return records;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async findPathSend(options: {
    sourceAsset: any;
    sourceAmount: string;
    destination: string;
  }) {
    try {
      const { records } = await this.server
        .strictSendPaths(
          options.sourceAsset,
          options.sourceAmount,
          options.destination,
        )
        .call();
      console.log('response: ', records);
      return records;
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
