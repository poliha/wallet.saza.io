import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountPage } from './create-account.page';
import { Utility, UserService } from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

describe('CreateAccountPage', () => {
  let component: CreateAccountPage;
  let fixture: ComponentFixture<CreateAccountPage>;
  let utilitySpy, userServiceSpy;


  beforeEach(async(() => {
    utilitySpy = jasmine.createSpyObj('Utility', ['getHash']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['getPassword']);

    TestBed.configureTestingModule({
      declarations: [ CreateAccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Utility, useValue: utilitySpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
      imports: [ReactiveFormsModule, RouterTestingModule, IonicModule]
    })
    .compileComponents();
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
