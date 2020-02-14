import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathSendPage } from './path-send.page';

describe('PathSendPage', () => {
  let component: PathSendPage;
  let fixture: ComponentFixture<PathSendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathSendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathSendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
