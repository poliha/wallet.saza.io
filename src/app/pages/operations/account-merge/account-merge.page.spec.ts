import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMergePage } from './account-merge.page';

describe('AccountMergePage', () => {
  let component: AccountMergePage;
  let fixture: ComponentFixture<AccountMergePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMergePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMergePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
