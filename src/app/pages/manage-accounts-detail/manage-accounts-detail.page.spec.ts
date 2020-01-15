import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountsDetailPage } from './manage-accounts-detail.page';

describe('ManageAccountsDetailPage', () => {
  let component: ManageAccountsDetailPage;
  let fixture: ComponentFixture<ManageAccountsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAccountsDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
