import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowTrustPage } from './allow-trust.page';

describe('AllowTrustPage', () => {
  let component: AllowTrustPage;
  let fixture: ComponentFixture<AllowTrustPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowTrustPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowTrustPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
