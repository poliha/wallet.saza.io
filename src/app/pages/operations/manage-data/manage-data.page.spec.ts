import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDataPage } from './manage-data.page';

describe('ManageDataPage', () => {
  let component: ManageDataPage;
  let fixture: ComponentFixture<ManageDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDataPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
