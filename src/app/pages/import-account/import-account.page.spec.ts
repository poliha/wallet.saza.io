import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAccountPage } from './import-account.page';

describe('ImportAccountPage', () => {
  let component: ImportAccountPage;
  let fixture: ComponentFixture<ImportAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportAccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
