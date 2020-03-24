import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHistoryComponent } from './account-history.component';
import { StellarService, UserService } from 'src/app/providers/providers';
import { SplitOpNamePipeModule } from 'src/app/pipes/split-operation-name-module';
import { TruncatePublicKeyPipeModule } from 'src/app/pipes/truncate-public-key.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountHistoryComponent', () => {
  let component: AccountHistoryComponent;
  let fixture: ComponentFixture<AccountHistoryComponent>;
  let userServiceSpy, stellarServiceSpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };
    userServiceSpy = jasmine.createSpyObj('UserService', ['activeAccount']);
    stellarServiceSpy = jasmine.createSpyObj('StellarService', [
      'loadOperations',
    ]);
    userServiceSpy.activeAccount = jasmine.createSpyObj('activeAccount', subFn);

    TestBed.configureTestingModule({
      declarations: [AccountHistoryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        SplitOpNamePipeModule,
        TruncatePublicKeyPipeModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: StellarService, useValue: stellarServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
