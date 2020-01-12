import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountsPage } from './manage-accounts.page';

describe('ManageAccountsPage', () => {
  let component: ManageAccountsPage;
  let fixture: ComponentFixture<ManageAccountsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAccountsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
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
