import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsQueueDetailPage } from './operations-queue-detail.page';
import { TruncatePublicKeyPipeModule } from 'src/app/pipes/truncate-public-key.module';
import { TxService, StellarService } from 'src/app/providers/providers';
import { SplitOpNamePipeModule } from 'src/app/pipes/split-operation-name-module';
import { RouterTestingModule } from '@angular/router/testing';
import { SplitOpName } from 'src/app/pipes/split-operation-name';
import { TitleCasePipe } from '@angular/common';

describe('OperationsQueueDetailPage', () => {
  let component: OperationsQueueDetailPage;
  let fixture: ComponentFixture<OperationsQueueDetailPage>;
  let stellarServiceSpy, txServiceSpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };
    stellarServiceSpy = jasmine.createSpyObj('StellarService', [
      'getOperationObject',
    ]);
    txServiceSpy = jasmine.createSpyObj('TxService', ['operations']);

    txServiceSpy.operations = jasmine.createSpyObj('operations', subFn);

    TestBed.configureTestingModule({
      declarations: [OperationsQueueDetailPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: TxService, useValue: txServiceSpy },
        { provide: StellarService, useValue: stellarServiceSpy },
        SplitOpName,
        TitleCasePipe,
      ],
      imports: [
        TruncatePublicKeyPipeModule,
        SplitOpNamePipeModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsQueueDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
