import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignTxPage } from './sign-tx.page';

describe('SignTxPage', () => {
  let component: SignTxPage;
  let fixture: ComponentFixture<SignTxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignTxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignTxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
