import { Injectable } from '@angular/core';
import {
  Networks,
  Keypair, Asset, Operation, TransactionBuilder, StrKey,
  FederationServer, StellarTomlResolver, Memo, Account, Server, xdr
} from 'stellar-sdk';
import { Buffer } from 'buffer';
import { TimeoutInfinite } from 'stellar-sdk';
import { Transaction } from 'stellar-sdk';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StellarService {
  activeNetwork: any;
  server: any;
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
      return false;
    }
  }

  async loadEffects(accountID) {
    try {
      const accountEffects = await this.server.effects().forAccount(accountID).order('desc').join('transactions').call();
      return accountEffects;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async loadOperations(accountID) {
    try {
      const accountOperations = await this.server.operations().forAccount(accountID).order('desc').join('transactions').call();
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
    const sourceAccount = await this.loadAccount(source);
    let newTx = new TransactionBuilder(sourceAccount, { fee: Number(fee) });

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

    // add timebound
    newTx = newTx.setTimeout(TimeoutInfinite);

    const builtTx = newTx.build();
    const txXdr = builtTx.toEnvelope().toXDR().toString('base64');

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

      allSigners.forEach( s => signerSet.add(s));
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
    if (localSigners.length > 1) {
      localSigners.sort((a, b) => b.weight - a.weight);
    }

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
    const txObj = new Transaction(tx, Networks.TESTNET);
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
      return txResult;
    } catch (error) {
      console.log('error: ', error);
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
    return Boolean(result);
  }

}
