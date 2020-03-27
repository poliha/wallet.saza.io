import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountPage } from './create-account.page';
import {
  TxService,
  UserService,
  StellarService,
} from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { InjectorService } from 'src/app/providers/injector.service';

describe('CreateAccountPage', () => {
  let component: CreateAccountPage;
  let fixture: ComponentFixture<CreateAccountPage>;
  let userServiceSpy, stellarServiceSpy, txServiceSpy;

  beforeEach(() => {
    const subFn = { subscribe: () => {} };
    userServiceSpy = jasmine.createSpyObj('UserService', ['activeAccount']);
    stellarServiceSpy = jasmine.createSpyObj('StellarService', {
      fees: Promise.resolve(),
    });
    txServiceSpy = jasmine.createSpyObj('TxService', ['operations', 'getMemo']);

    stellarServiceSpy.operationType = { CREATE_ACCOUNT: 'create_account' };
    userServiceSpy.activeAccount = jasmine.createSpyObj('activeAccount', subFn);
    txServiceSpy.operations = jasmine.createSpyObj('operations', subFn);
    txServiceSpy.getMemo.and.returnValue(Promise.resolve());
  });

  beforeEach(async(() => {
    txServiceSpy = jasmine.createSpyObj('TxService', ['addOperation']);

    TestBed.configureTestingModule({
      declarations: [CreateAccountPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: TxService, useValue: txServiceSpy },
        { provide: StellarService, useValue: stellarServiceSpy },
      ],
      imports: [RouterTestingModule, ReactiveFormsModule, IonicModule],
    }).compileComponents();
  }));

  beforeEach(() => InjectorService.setInjector(TestBed.get(Injector)));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
