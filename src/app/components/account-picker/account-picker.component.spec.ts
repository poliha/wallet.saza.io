import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPickerComponent } from './account-picker.component';
import { UserService } from 'src/app/providers/providers';
import { TruncatePublicKeyPipeModule } from 'src/app/pipes/truncate-public-key.module';

describe('AccountPickerComponent', () => {
  let component: AccountPickerComponent;
  let fixture: ComponentFixture<AccountPickerComponent>;
  let userServiceSpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };
    const getValueFn = { getValue: () => {} };
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'userAccounts',
      'activeAccount',
      'setActiveAccount',
    ]);
    userServiceSpy.activeAccount = jasmine.createSpyObj('activeAccount', subFn);

    userServiceSpy.userAccounts = jasmine.createSpyObj(
      'userAccounts',
      getValueFn,
    );

    TestBed.configureTestingModule({
      declarations: [AccountPickerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
      imports: [TruncatePublicKeyPipeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
