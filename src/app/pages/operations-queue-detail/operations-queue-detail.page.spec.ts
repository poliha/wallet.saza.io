import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsQueueDetailPage } from './operations-queue-detail.page';

describe('OperationsQueueDetailPage', () => {
  let component: OperationsQueueDetailPage;
  let fixture: ComponentFixture<OperationsQueueDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsQueueDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsQueueDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
