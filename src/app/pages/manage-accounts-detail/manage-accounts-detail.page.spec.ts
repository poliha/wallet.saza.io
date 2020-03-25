import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountsDetailPage } from './manage-accounts-detail.page';
import {
  UserService,
  NotificationService,
  Utility,
} from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageAccountsDetailPage', () => {
  let component: ManageAccountsDetailPage;
  let fixture: ComponentFixture<ManageAccountsDetailPage>;
  let userServiceSpy, utilitySpy, notifySpy;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'getPassword',
      'getAccounts',
    ]);
    utilitySpy = jasmine.createSpyObj('Utility', ['validateHash']);
    notifySpy = jasmine.createSpyObj('NofificationService', ['success']);

    userServiceSpy.getPassword.and.returnValue(Promise.resolve());
    userServiceSpy.getAccounts.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      declarations: [ManageAccountsDetailPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Utility, useValue: utilitySpy },
        { provide: NotificationService, useValue: notifySpy },
      ],
      imports: [ReactiveFormsModule, IonicModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
