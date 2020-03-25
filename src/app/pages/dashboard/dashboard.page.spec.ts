import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard.page';
import { UserService } from 'src/app/providers/providers';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let userServiceSpy;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getAccounts']);
    userServiceSpy.getAccounts.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      declarations: [DashboardPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
