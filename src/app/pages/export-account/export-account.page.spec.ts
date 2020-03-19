import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportAccountPage } from './export-account.page';

describe('ExportAccountPage', () => {
  let component: ExportAccountPage;
  let fixture: ComponentFixture<ExportAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportAccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
