import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEYS = {
  'OPERATIONS': 'user.saza.operations',
};
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public operations: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(public storage: Storage) {
    this.getOperations();
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
