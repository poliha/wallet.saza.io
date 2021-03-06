import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceItemComponent } from './balance-item.component';

describe('BalanceItemComponent', () => {
  let component: BalanceItemComponent;
  let fixture: ComponentFixture<BalanceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceItemComponent);
    component = fixture.componentInstance;
    component.balance = {
      balance: '10000.0000000',
      buying_liabilities: '0.0000000',
      selling_liabilities: '0.0000000',
      asset_type: 'native',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
