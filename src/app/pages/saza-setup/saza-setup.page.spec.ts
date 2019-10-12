import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SazaSetupPage } from './saza-setup.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Utility, UserService } from 'src/app/providers/providers';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController, IonicModule } from '@ionic/angular';

describe('SazaSetupPage', () => {
  let component: SazaSetupPage;
  let fixture: ComponentFixture<SazaSetupPage>;
  let utilitySpy, userServiceSpy, modalSpy, modalCtrlSpy;

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
  // to do: write more tests
});
