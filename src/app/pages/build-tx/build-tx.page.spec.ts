import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildTxPage } from './build-tx.page';

describe('BuildTxPage', () => {
  let component: BuildTxPage;
  let fixture: ComponentFixture<BuildTxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildTxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildTxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
