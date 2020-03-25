import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAccountPage } from './link-account.page';
import { Utility, UserService } from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

describe('LinkAccountPage', () => {
  let component: LinkAccountPage;
  let fixture: ComponentFixture<LinkAccountPage>;
  let utilitySpy, userServiceSpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };
    utilitySpy = jasmine.createSpyObj('Utility', ['getHash']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['userAccounts']);
    userServiceSpy.userAccounts = jasmine.createSpyObj('userAccounts', subFn);

    TestBed.configureTestingModule({
      declarations: [LinkAccountPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Utility, useValue: utilitySpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
