import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let storageSpy;
  let txService: TransactionService;
  let storageServiceSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('Storage', ['get', 'set']);
    TestBed.configureTestingModule({
      providers: [TransactionService, { provide: Storage, useValue: storageSpy }]
    });

    txService = TestBed.get(TransactionService);
    storageServiceSpy = TestBed.get(Storage);
  });

  it('should be created', () => {
    // const service: TransactionService = TestBed.get(TransactionService);
    expect(txService).toBeTruthy();
  });
});
