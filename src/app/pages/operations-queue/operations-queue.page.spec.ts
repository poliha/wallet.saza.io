import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsQueuePage } from './operations-queue.page';
import { TxService, StellarService } from 'src/app/providers/providers';
import { TruncatePublicKeyPipeModule } from 'src/app/pipes/truncate-public-key.module';
import { SplitOpNamePipeModule } from 'src/app/pipes/split-operation-name-module';

describe('OperationsQueuePage', () => {
  let component: OperationsQueuePage;
  let fixture: ComponentFixture<OperationsQueuePage>;
  let stellarServiceSpy, txServiceSpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };
    stellarServiceSpy = jasmine.createSpyObj('StellarService', [
      'getOperationObject',
    ]);
    txServiceSpy = jasmine.createSpyObj('TxService', ['operations']);

    txServiceSpy.operations = jasmine.createSpyObj('operations', subFn);

    TestBed.configureTestingModule({
      declarations: [OperationsQueuePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: TxService, useValue: txServiceSpy },
        { provide: StellarService, useValue: stellarServiceSpy },
      ],
      imports: [TruncatePublicKeyPipeModule, SplitOpNamePipeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsQueuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
