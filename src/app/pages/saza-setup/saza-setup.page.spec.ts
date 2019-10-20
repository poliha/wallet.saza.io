import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SazaSetupPage } from './saza-setup.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Utility, UserService } from 'src/app/providers/providers';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController, IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { element } from '@angular/core/src/render3';

describe('SazaSetupPage', () => {
  let component: SazaSetupPage;
  let fixture: ComponentFixture<SazaSetupPage>;
  let utilitySpy, userServiceSpy, modalSpy, modalCtrlSpy, checkboxes, useSuggestion;

  beforeEach(async(() => {
    utilitySpy = jasmine.createSpyObj('Utility', ['generatePassword', 'getHash']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['getPassword']);
    modalSpy = jasmine.createSpyObj('Modal', ['present']);
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
    modalCtrlSpy.create.and.callFake(function () {
      return modalSpy;
    });

    TestBed.configureTestingModule({
      declarations: [ SazaSetupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Utility, useValue: utilitySpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: ModalController, useValue: modalCtrlSpy }
      ],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SazaSetupPage);
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

  describe('When suggested password is used', () => {
    beforeEach(() => {
      component.suggestedPassword = 'abcd1234';
      checkboxes = fixture.nativeElement.querySelectorAll('ion-checkbox');
      useSuggestion = checkboxes[0];
      useSuggestion.checked = 'true';
      useSuggestion.dispatchEvent(new Event('ionChange'));
      fixture.detectChanges();
    });

    it('passwordSaved checkbox should be visible', () => {
      expect(useSuggestion.checked).toBe('true');
      component.useSuggestion.patchValue(true);
      fixture.detectChanges();
      checkboxes = fixture.nativeElement.querySelectorAll('ion-checkbox');
      expect(checkboxes.length).toEqual(2);
      expect(checkboxes[1].name).toEqual('passwordSaved');
    });

    it('both password and confirm password should match', () => {
      expect(useSuggestion.checked).toBe('true');
      expect(component.password.value).toEqual('abcd1234');
      expect(component.confirmPassword.value).toEqual('abcd1234');
      expect(component.confirmPassword.value).toEqual(component.password.value);
    });

    it('password and confirm password field should be disabled', () => {
      expect(useSuggestion.checked).toBe('true');
      expect(component.password.disabled).toBeTruthy();
      expect(component.confirmPassword.disabled).toBeTruthy();
    });
  });

});
