import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveOfferPage } from './passive-offer.page';

describe('PassiveOfferPage', () => {
  let component: PassiveOfferPage;
  let fixture: ComponentFixture<PassiveOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassiveOfferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
