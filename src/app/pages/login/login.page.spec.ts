import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { LoginPage } from './login.page';
import {
  Utility,
  UserService,
  INVALID_PASSWORD_ERROR,
  NotificationService,
} from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let utilitySpy, userServiceSpy, routerSpy, notifySpy;

  beforeEach(async(() => {
    utilitySpy = jasmine.createSpyObj('Utility', ['validateHash']);
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'getPassword',
      'login',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    notifySpy = jasmine.createSpyObj('NofificationService', ['success']);

    TestBed.configureTestingModule({
      declarations: [LoginPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Utility, useValue: utilitySpy },
        { provide: UserService, useValue: userServiceSpy },
        // { provide: Router, useValue: routerSpy },
        { provide: NotificationService, useValue: notifySpy },
        // MenuController,
      ],
      imports: [ReactiveFormsModule, IonicModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    const template = fixture.nativeElement;
    const form = template.querySelectorAll('form');
    expect(form.length).toEqual(1);
  });

  it('should have a password field', () => {
    const template = fixture.nativeElement;
    const allInputs = template.querySelectorAll('ion-input');
    expect(allInputs.length).toEqual(1);
    expect(allInputs[0].name).toEqual('password');
  });

  it('should have a login button', () => {
    const template = fixture.nativeElement;
    const allButtons = template.querySelectorAll('ion-button');
    expect(allButtons.length).toEqual(1);
    expect(allButtons[0].textContent).toContain('Login');
  });

  describe('When password is not valid', () => {
    it('should throw an error', fakeAsync(() => {
      userServiceSpy.getPassword.and.returnValue(Promise.resolve('abc'));
      utilitySpy.validateHash.and.returnValue(false);
      component.formSubmit().catch(err => {
        expect(err.message).toContain(INVALID_PASSWORD_ERROR);
      });
    }));
  });

  describe('When password is valid', () => {
    it('router should navigate to dashboard/', fakeAsync(() => {
      userServiceSpy.getPassword.and.returnValue(Promise.resolve('abc'));
      utilitySpy.validateHash.and.returnValue(true);
      userServiceSpy.login.and.returnValue(Promise.resolve('abc'));

      component.formSubmit();
      tick();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard/']);
    }));
  });
});
