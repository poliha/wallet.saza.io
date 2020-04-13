import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEYS = {
  OPERATIONS: 'user.saza.operations',
  TRANSACTION: 'user.saza.tx',
  MEMO: 'user.saza.tx-memo',
};
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public operations: BehaviorSubject<any> = new BehaviorSubject([]);
  public tx: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(public storage: Storage) {
    this.getOperations();
    this.getTx();
  }

  getOperations() {
    return this.getData(STORAGE_KEYS.OPERATIONS).then((ops: any) => {
      if (ops == null) {
        ops = [];
      }
      this.operations.next(ops);
      return ops;
    });
  }

  addOperation(data: any) {
    return this.getOperations().then((ops: Array<any>) => {
      ops.push(data);
      this.setData(STORAGE_KEYS.OPERATIONS, ops);
      this.operations.next(ops);
    });
  }

  deleteOperation(id) {
    const opId = parseInt(id, 10);
    if (!Number.isInteger(opId)) {
      return;
    }
    return this.getOperations().then((ops: Array<any>) => {
      ops.splice(opId, 1);
      this.setData(STORAGE_KEYS.OPERATIONS, ops);
      this.operations.next(ops);
    });
  }

  deleteAllOperations() {
    return this.storage.remove(STORAGE_KEYS.OPERATIONS);
  }

  setTx(data: string) {
    return this.setData(STORAGE_KEYS.TRANSACTION, data);
  }

  getTx() {
    return this.getData(STORAGE_KEYS.TRANSACTION).then((tx: any) => {
      this.tx.next(tx);
      return tx;
    });
  }

  deleteTx() {
    return this.storage.remove(STORAGE_KEYS.TRANSACTION);
  }

  setMemo(data: any) {
    return this.setData(STORAGE_KEYS.MEMO, data);
  }

  getMemo() {
    return this.getData(STORAGE_KEYS.MEMO);
  }

  deleteMemo() {
    return this.storage.remove(STORAGE_KEYS.MEMO);
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
