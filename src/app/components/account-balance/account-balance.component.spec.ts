import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBalanceComponent } from './account-balance.component';
import { StellarService, UserService } from 'src/app/providers/providers';

describe('AccountBalanceComponent', () => {
  let component: AccountBalanceComponent;
  let fixture: ComponentFixture<AccountBalanceComponent>;
  let userServiceSpy, stellarServiceSpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };
    userServiceSpy = jasmine.createSpyObj('UserService', ['activeAccount']);
    stellarServiceSpy = jasmine.createSpyObj('StellarService', ['loadAccount']);
    userServiceSpy.activeAccount = jasmine.createSpyObj('activeAccount', subFn);

    TestBed.configureTestingModule({
      declarations: [AccountBalanceComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StellarService, useValue: stellarServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
