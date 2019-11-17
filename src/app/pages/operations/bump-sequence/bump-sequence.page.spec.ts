import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BumpSequencePage } from './bump-sequence.page';

describe('BumpSequencePage', () => {
  let component: BumpSequencePage;
  let fixture: ComponentFixture<BumpSequencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BumpSequencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BumpSequencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
