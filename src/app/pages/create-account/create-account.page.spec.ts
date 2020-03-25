import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountPage } from './create-account.page';
import {
  Utility,
  UserService,
  NotificationService,
} from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

describe('CreateAccountPage', () => {
  let component: CreateAccountPage;
  let fixture: ComponentFixture<CreateAccountPage>;
  let utilitySpy, userServiceSpy, notifySpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };

    utilitySpy = jasmine.createSpyObj('Utility', ['getHash']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['userAccounts']);
    notifySpy = jasmine.createSpyObj('NofificationService', ['success']);
    userServiceSpy.userAccounts = jasmine.createSpyObj('userAccounts', subFn);

    TestBed.configureTestingModule({
      declarations: [CreateAccountPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Utility, useValue: utilitySpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: NotificationService, useValue: notifySpy },
      ],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
