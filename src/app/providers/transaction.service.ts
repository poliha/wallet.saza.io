import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEYS = {
  'OPERATIONS': 'user.saza.operations',
  'TRANSACTION': 'user.saza.tx'
};
@Injectable({
  providedIn: 'root'
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
      this.operations.next(ops);
      // to do: refactor this
      return this.getData(STORAGE_KEYS.OPERATIONS);
    });
  }

  // to do: deleteOperation
  addOperation(data: any) {
    return this.getOperations().then((ops: Array<any>) => {
      if (ops == null) {
        ops = [];
      }
      ops.push(data);
      this.setData(STORAGE_KEYS.OPERATIONS, ops);
      this.operations.next(ops);
    });
  }

  setTx(data: string) {
    return this.setData(STORAGE_KEYS.TRANSACTION, data);
  }

  getTx() {
    return this.getData(STORAGE_KEYS.TRANSACTION).then((tx: any) => {
      this.tx.next(tx);
      return this.getData(STORAGE_KEYS.TRANSACTION);
    });
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
