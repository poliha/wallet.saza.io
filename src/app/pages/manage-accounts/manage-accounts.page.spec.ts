import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountsPage } from './manage-accounts.page';
import { UserService, Utility } from 'src/app/providers/providers';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { TruncatePublicKeyPipeModule } from 'src/app/pipes/truncate-public-key.module';

describe('ManageAccountsPage', () => {
  let component: ManageAccountsPage;
  let fixture: ComponentFixture<ManageAccountsPage>;
  let userServiceSpy, utilitySpy;

  beforeEach(async(() => {
    const subFn = { subscribe: () => {} };
    userServiceSpy = jasmine.createSpyObj('UserService', ['getAccounts']);
    utilitySpy = jasmine.createSpyObj('Utility', ['validateHash']);
    userServiceSpy.userAccounts = jasmine.createSpyObj('userAccounts', subFn);

    TestBed.configureTestingModule({
      declarations: [ManageAccountsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Utility, useValue: utilitySpy },
      ],
      imports: [
        ReactiveFormsModule,
        IonicModule,
        RouterTestingModule,
        TruncatePublicKeyPipeModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
