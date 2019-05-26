import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkAccountPage } from './link-account.page';

describe('LinkAccountPage', () => {
  let component: LinkAccountPage;
  let fixture: ComponentFixture<LinkAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkAccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
