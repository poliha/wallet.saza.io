import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SazaSetupPage } from './saza-setup.page';

describe('SazaSetupPage', () => {
  let component: SazaSetupPage;
  let fixture: ComponentFixture<SazaSetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SazaSetupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SazaSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
