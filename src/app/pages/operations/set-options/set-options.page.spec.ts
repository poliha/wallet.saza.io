import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOptionsPage } from './set-options.page';

describe('SetOptionsPage', () => {
  let component: SetOptionsPage;
  let fixture: ComponentFixture<SetOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetOptionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
