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

  async loadEffects(accountID) {
    // to do initialise server based on network type
    const server = new Server('https://horizon-testnet.stellar.org');

    try {
      const accountEffects = await server.effects().forAccount('GAQHWQYBBW272OOXNQMMLCA5WY2XAZPODGB7Q3S5OKKIXVESKO55ZQ7C').order('desc').call();

      // to do update stellar sdk so you can use join
      // const accountEffects = await server.effects().forAccount(accountID).order('desc').join('transactions').call();
      return accountEffects;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async loadOperations(accountID) {
    // to do initialise server based on network type
    const server = new Server('https://horizon-testnet.stellar.org');

    try {
      const accountOperations = await server.operations().forAccount('GAQHWQYBBW272OOXNQMMLCA5WY2XAZPODGB7Q3S5OKKIXVESKO55ZQ7C').order('desc').call();

      // to do update stellar sdk so you can use join
      // const accountEffects = await server.effects().forAccount('GAQHWQYBBW272OOXNQMMLCA5WY2XAZPODGB7Q3S5OKKIXVESKO55ZQ7C').order('desc').join('transactions').call();
      return accountOperations;
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
