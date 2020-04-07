import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccountPage } from './new-account.page';
import {
  Utility,
  UserService,
  NotificationService,
} from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

describe('NewAccountPage', () => {
  let component: NewAccountPage;
  let fixture: ComponentFixture<NewAccountPage>;
  let utilitySpy, userServiceSpy, notifySpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };

    utilitySpy = jasmine.createSpyObj('Utility', ['getHash']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['userAccounts']);
    notifySpy = jasmine.createSpyObj('NofificationService', ['success']);
    userServiceSpy.userAccounts = jasmine.createSpyObj('userAccounts', subFn);

    TestBed.configureTestingModule({
      declarations: [NewAccountPage],
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
    fixture = TestBed.createComponent(NewAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
