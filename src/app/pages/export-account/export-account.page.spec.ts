import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportAccountPage } from './export-account.page';
import { UserService, Utility } from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExportAccountPage', () => {
  let component: ExportAccountPage;
  let fixture: ComponentFixture<ExportAccountPage>;
  let userServiceSpy, utilitySpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };

    userServiceSpy = jasmine.createSpyObj('UserService', ['userAccounts']);
    utilitySpy = jasmine.createSpyObj('Utility', ['validateHash']);
    userServiceSpy.userAccounts = jasmine.createSpyObj('userAccounts', subFn);

    TestBed.configureTestingModule({
      declarations: [ExportAccountPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Utility, useValue: utilitySpy },
      ],
      imports: [ReactiveFormsModule, IonicModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
