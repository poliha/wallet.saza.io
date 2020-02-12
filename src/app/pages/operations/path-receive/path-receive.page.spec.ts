import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathReceivePage } from './path-receive.page';

describe('PathReceivePage', () => {
  let component: PathReceivePage;
  let fixture: ComponentFixture<PathReceivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathReceivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathReceivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
