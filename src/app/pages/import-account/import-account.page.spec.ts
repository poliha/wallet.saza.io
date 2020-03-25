import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAccountPage } from './import-account.page';
import {
  UserService,
  Utility,
  NotificationService,
} from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('ImportAccountPage', () => {
  let component: ImportAccountPage;
  let fixture: ComponentFixture<ImportAccountPage>;
  let userServiceSpy, utilitySpy, notifySpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };
    userServiceSpy = jasmine.createSpyObj('UserService', ['userAccounts']);
    utilitySpy = jasmine.createSpyObj('Utility', ['validateHash']);
    userServiceSpy.userAccounts = jasmine.createSpyObj('userAccounts', subFn);
    notifySpy = jasmine.createSpyObj('NofificationService', ['success']);

    TestBed.configureTestingModule({
      declarations: [ImportAccountPage],
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
    fixture = TestBed.createComponent(ImportAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
