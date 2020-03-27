import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOfferPage } from './buy-offer.page';
import {
  UserService,
  TxService,
  StellarService,
  Utility,
} from 'src/app/providers/providers';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InjectorService } from 'src/app/providers/injector.service';

describe('BuyOfferPage', () => {
  let component: BuyOfferPage;
  let fixture: ComponentFixture<BuyOfferPage>;
  let userServiceSpy, stellarServiceSpy, txServiceSpy, utilitySpy;

  beforeEach(() => {
    const subFn = { subscribe: () => {} };
    userServiceSpy = jasmine.createSpyObj('UserService', ['activeAccount']);
    stellarServiceSpy = jasmine.createSpyObj('StellarService', {
      fees: Promise.resolve(),
    });
    txServiceSpy = jasmine.createSpyObj('TxService', ['operations', 'getMemo']);
    utilitySpy = jasmine.createSpyObj('Utility', ['generateAsset']);

    stellarServiceSpy.operationType = { MANAGE_BUY_OFFER: 'manage_buy_offer' };
    userServiceSpy.activeAccount = jasmine.createSpyObj('activeAccount', subFn);
    txServiceSpy.operations = jasmine.createSpyObj('operations', subFn);
    txServiceSpy.getMemo.and.returnValue(Promise.resolve());
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuyOfferPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: TxService, useValue: txServiceSpy },
        { provide: StellarService, useValue: stellarServiceSpy },
        { provide: Utility, useValue: utilitySpy },
      ],
      imports: [RouterTestingModule, ReactiveFormsModule, IonicModule],
    }).compileComponents();
  }));

  beforeEach(() => InjectorService.setInjector(TestBed.get(Injector)));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
