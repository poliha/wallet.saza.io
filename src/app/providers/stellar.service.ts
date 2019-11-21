import { Injectable } from '@angular/core';
import {
  Network,
  Keypair, Asset, Operation, TransactionBuilder, StrKey,
  FederationServer, StellarTomlResolver, Memo, Account, Server
} from 'stellar-sdk';

@Injectable({
  providedIn: 'root'
})
export class StellarService {

  constructor() { }

  async loadAccount(accountID) {
    // to do initialise server based on network type
    const server = new Server('https://horizon-testnet.stellar.org');

    try {
      const accountDetail = await server.loadAccount(accountID);
      return accountDetail;
    } catch (error) {
      console.log('error: ', error);
    }
  }

}
