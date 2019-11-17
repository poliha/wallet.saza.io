import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTrustPage } from './change-trust.page';

describe('ChangeTrustPage', () => {
  let component: ChangeTrustPage;
  let fixture: ComponentFixture<ChangeTrustPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTrustPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTrustPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
