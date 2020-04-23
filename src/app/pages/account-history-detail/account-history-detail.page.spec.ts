import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHistoryDetailPage } from './account-history-detail.page';
import { SplitOpNamePipeModule } from 'src/app/pipes/split-operation-name-module';
import { UserService } from 'src/app/providers/providers';
import { SplitOpName } from 'src/app/pipes/split-operation-name';
import { TitleCasePipe } from '@angular/common';

describe('AccountHistoryDetailPage', () => {
  let component: AccountHistoryDetailPage;
  let fixture: ComponentFixture<AccountHistoryDetailPage>;
  let userServiceSpy;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'getAccountHistory',
      'isAuthValid',
    ]);

    TestBed.configureTestingModule({
      declarations: [AccountHistoryDetailPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        SplitOpName,
        TitleCasePipe,
      ],
      imports: [SplitOpNamePipeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHistoryDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
