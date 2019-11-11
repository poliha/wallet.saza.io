import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOfferPage } from './buy-offer.page';

describe('BuyOfferPage', () => {
  let component: BuyOfferPage;
  let fixture: ComponentFixture<BuyOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyOfferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
