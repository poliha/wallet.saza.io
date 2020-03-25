import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignTxPage } from './sign-tx.page';
import {
  UserService,
  TxService,
  StellarService,
  Utility,
} from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignTxPage', () => {
  let component: SignTxPage;
  let fixture: ComponentFixture<SignTxPage>;
  let userServiceSpy, stellarServiceSpy, txServiceSpy, utilitySpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };
    userServiceSpy = jasmine.createSpyObj('UserService', ['userAccounts']);
    stellarServiceSpy = jasmine.createSpyObj('StellarService', {
      fees: Promise.resolve(),
    });
    txServiceSpy = jasmine.createSpyObj('TxService', ['operations', 'getTx']);
    utilitySpy = jasmine.createSpyObj('Utility', ['validateHash']);

    userServiceSpy.userAccounts = jasmine.createSpyObj('userAccounts', subFn);
    txServiceSpy.operations = jasmine.createSpyObj('operations', subFn);
    txServiceSpy.getTx.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      declarations: [SignTxPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: TxService, useValue: txServiceSpy },
        { provide: Utility, useValue: utilitySpy },
        { provide: StellarService, useValue: stellarServiceSpy },
      ],
      imports: [ReactiveFormsModule, IonicModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignTxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
