import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOfferPage } from './sell-offer.page';

describe('SellOfferPage', () => {
  let component: SellOfferPage;
  let fixture: ComponentFixture<SellOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellOfferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
