import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let storageSpy;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('Storage', ['get', 'set']);
    storageSpy.get.and.returnValue(Promise.resolve());
    TestBed.configureTestingModule({
      providers: [{ provide: Storage, useValue: storageSpy }],
    }).compileComponents();
  });

  it('should be created', () => {
    const service: TransactionService = TestBed.get(TransactionService);
    expect(service).toBeTruthy();
  });
});
