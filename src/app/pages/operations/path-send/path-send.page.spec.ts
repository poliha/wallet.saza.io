import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathSendPage } from './path-send.page';
import {
  UserService,
  TxService,
  StellarService,
} from 'src/app/providers/providers';
import { Utility } from 'src/app/providers/utility';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material.module';
import { InjectorService } from 'src/app/providers/injector.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PathSendPage', () => {
  let component: PathSendPage;
  let fixture: ComponentFixture<PathSendPage>;
  let userServiceSpy, stellarServiceSpy, txServiceSpy, utilitySpy;

  beforeEach(() => {
    const subFn = { subscribe: () => {} };
    userServiceSpy = jasmine.createSpyObj('UserService', ['activeAccount']);
    stellarServiceSpy = jasmine.createSpyObj('StellarService', {
      fees: Promise.resolve(),
    });
    txServiceSpy = jasmine.createSpyObj('TxService', ['operations', 'getMemo']);
    utilitySpy = jasmine.createSpyObj('Utility', ['generateAsset']);

    stellarServiceSpy.operationType = {
      PATH_PAYMENT_STRICT_SEND: 'path_payment_strict_send',
    };
    userServiceSpy.activeAccount = jasmine.createSpyObj('activeAccount', subFn);
    txServiceSpy.operations = jasmine.createSpyObj('operations', subFn);
    txServiceSpy.getMemo.and.returnValue(Promise.resolve());
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PathSendPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: TxService, useValue: txServiceSpy },
        { provide: StellarService, useValue: stellarServiceSpy },
        { provide: Utility, useValue: utilitySpy },
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        IonicModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => InjectorService.setInjector(TestBed.get(Injector)));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathSendPage);
    component = fixture.componentInstance;
    spyOnProperty(component, 'sourceAmount').and.returnValue(1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
