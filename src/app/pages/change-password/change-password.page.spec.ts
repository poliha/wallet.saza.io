import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordPage } from './change-password.page';
import { Utility } from 'src/app/providers/utility';
import { NotificationService, UserService } from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChangePasswordPage', () => {
  let component: ChangePasswordPage;
  let fixture: ComponentFixture<ChangePasswordPage>;
  let userServiceSpy, utilitySpy, notifySpy;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'getPassword',
      'getAccounts',
      'getPasswordRecovery',
    ]);
    utilitySpy = jasmine.createSpyObj('Utility', ['validateHash']);
    notifySpy = jasmine.createSpyObj('NofificationService', ['success']);

    TestBed.configureTestingModule({
      declarations: [ChangePasswordPage],
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
    fixture = TestBed.createComponent(ChangePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
