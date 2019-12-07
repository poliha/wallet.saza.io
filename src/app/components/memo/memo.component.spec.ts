import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoComponent } from './memo.component';

describe('MemoComponent', () => {
  let component: MemoComponent;
  let fixture: ComponentFixture<MemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
